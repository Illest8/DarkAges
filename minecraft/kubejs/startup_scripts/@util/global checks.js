// === Shared helpers ===
global.cleanStr = function (val) {
  if (val == null) return "";
  var s = String(val);
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    s = s.substring(1, s.length - 1);
  }
  return s;
};

global.nbtClassName = function (nbt) {
  try {
    return (nbt && nbt.getClass && nbt.getClass().getName)
      ? nbt.getClass().getName()
      : "";
  } catch (e) {
    return "";
  }
};

global.asNumber = function (val) {
  if (val == null) return NaN;
  if (typeof val === 'number') return val;
  if (val.getAsDouble) return val.getAsDouble();
  if (val.getAsFloat) return val.getAsFloat();
  if (val.getAsLong) return val.getAsLong();
  if (val.getAsInt) return val.getAsInt();
  if (val.getAsShort) return val.getAsShort();
  if (val.getAsByte) return val.getAsByte();
  var n = Number(global.cleanStr(val));
  return Number.isFinite(n) ? n : NaN;
};

global.compareStringCollection = function (nbt, expected) {
  var cls = global.nbtClassName(nbt);
  if (cls === "net.minecraft.nbt.ListTag") {
    for (var i = 0; i < nbt.size(); i++) {
      if (global.cleanStr(nbt.get(i)) === expected) return true;
    }
    return false;
  }
  if (Array.isArray(nbt)) {
    return nbt.some(function (v) { return global.cleanStr(v) === expected; });
  }
  if (cls === "net.minecraft.nbt.CompoundTag") {
    var keys = nbt.getAllKeys();
    var it = keys.iterator();
    while (it.hasNext()) {
      var key = it.next();
      if (global.cleanStr(nbt.get(key)) === expected) return true;
    }
    return false;
  }
  return global.cleanStr(nbt) === expected;
};

global.compareNumericCollection = function (nbt, expectedNum, comparator) {
  var cls = global.nbtClassName(nbt);
  if (cls === "net.minecraft.nbt.ListTag") {
    for (var i = 0; i < nbt.size(); i++) {
      var num = global.asNumber(nbt.get(i));
      if (Number.isFinite(num) && comparator(num, expectedNum)) return true;
    }
    return false;
  }
  if (Array.isArray(nbt)) {
    return nbt.some(function (v) {
      var num = global.asNumber(v);
      return Number.isFinite(num) && comparator(num, expectedNum);
    });
  }
  if (cls === "net.minecraft.nbt.CompoundTag") {
    var keys = nbt.getAllKeys();
    var it = keys.iterator();
    while (it.hasNext()) {
      var key = it.next();
      var num = global.asNumber(nbt.get(key));
      if (Number.isFinite(num) && comparator(num, expectedNum)) return true;
    }
    return false;
  }
  var num = global.asNumber(nbt);
  return Number.isFinite(num) && comparator(num, expectedNum);
};

// === Rhino‑safe $check ===

global.$check = function (type, player) {
  var args = Array.prototype.slice.call(arguments, 2);
  var invert = false;

  // If the last arg is strictly true/false, treat it as invert flag
  if (typeof args[args.length - 1] === "boolean") {
    invert = args.pop();
  }

  var pass = false;

  switch (type) {
    case "data": {
      var key = args[0];
      var value = args[1];
      var nbt = player.persistentData.get(key);
      if (value === undefined) {
        var cls = global.nbtClassName(nbt);
        if (nbt != null) {
          if (cls === "net.minecraft.nbt.ListTag") pass = nbt.size() > 0;
          else if (cls === "net.minecraft.nbt.CompoundTag") pass = !nbt.isEmpty();
          else pass = global.cleanStr(nbt).length > 0;
        }
      } else {
        pass = global.compareStringCollection(nbt, String(value));
      }
      break;
    }

    case "dataHigher": {
      var key = args[0], value = args[1];
      var nbt = player.persistentData.get(key);
      var num = Number(value);
      if (Number.isFinite(num)) {
        pass = global.compareNumericCollection(nbt, num, function (a, b) { return a > b; });
      }
      break;
    }

    case "dataLower": {
      var key = args[0], value = args[1];
      var nbt = player.persistentData.get(key);
      var num = Number(value);
      if (Number.isFinite(num)) {
        pass = global.compareNumericCollection(nbt, num, function (a, b) { return a < b; });
      }
      break;
    }

    case "quest": {
      var questId = args[0];
      try {
        pass = FTBQuests.getServerDataFromPlayer(player).isCompleted(questId);
      } catch (e) {
        pass = false;
      }
      break;
    }

     case "questAvailable": {
      var questId = args[0];
      try {
        pass = FTBQuests.getServerDataFromPlayer(player).canStartQuest(questId);
      } catch (e) {
        pass = false;
      }
      break;
    }

    case "stage": {
      var stageName = args[0];
      pass = player.stages.has(stageName);
      break;
    }

    case "structure": {
      var expectedId = String(args[0]);
      try {
        var level = player.level; // ServerLevel
        var blockPos = player.blockPosition(); // player’s current BlockPos
        var structures = getStructuresAtPos(level, blockPos);
        pass = structures.includes(expectedId);
      } catch (e) {
        pass = false;
      }
      break;
    }

    case "building": {
      var expectedId = String(args[0]);
      try {
        var blockPos = player.blockPosition();
        var buildings = getTownBuilding(player, blockPos);
        pass = buildings.includes(expectedId);
      } catch (e) {
        pass = false;
      }
      break;
    }

    case "item": {
      var itemId = args[0], amount = args[1];
      var total = 0;

      var inv = player.inventory;
      if (inv && inv.getAllItems) {
        var list = inv.getAllItems();
        for (var i = 0; i < list.size(); i++) {
          var st = list.get(i);
          if (!st || (st.isEmpty && st.isEmpty())) continue;
          if (Ingredient.of(String(itemId)).test(st)) {
            total += st.count != null ? st.count : (st.getCount ? st.getCount() : 1);
          }
        }
      } else if (inv && inv.getContainerSize && inv.getItem) {
        for (var i = 0; i < inv.getContainerSize(); i++) {
          var st2 = inv.getItem(i);
          if (!st2 || (st2.isEmpty && st2.isEmpty())) continue;
          if (Ingredient.of(String(itemId)).test(st2)) {
            total += st2.count != null ? st2.count : (st2.getCount ? st2.getCount() : 1);
          }
        }
      }

      pass = amount ? total >= amount : total > 0;
      break;
    }
  }

  return invert ? !pass : pass;
};