let SwordItem = Java.loadClass("net.minecraft.world.item.SwordItem");
let BowItem = Java.loadClass("net.minecraft.world.item.BowItem");
let CrossbowItem = Java.loadClass("net.minecraft.world.item.CrossbowItem");
let ItemStackCls = Java.loadClass("net.minecraft.world.item.ItemStack");
let CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
let ListTag = Java.loadClass("net.minecraft.nbt.ListTag");

function vialIdToOilName(id) {
  if (typeof id !== "string") id = String(id);
  if (!id.startsWith("darkages:") || !id.endsWith("_vial")) return null;
  let raw = id.substring("darkages:".length, id.length - "_vial".length);
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

let OILS = global.oils.map(o => ({
  oilName: o.name.charAt(0).toUpperCase() + o.name.slice(1),
  uses: o.uses
}));

function findOilDefByName(name) {
  return OILS.find(o => o.oilName === name);
}

function jsObjectToCompound(obj) {
  let out = new CompoundTag();
  for (let k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    let v = obj[k];
    if (v === null || v === undefined) continue;
    if (typeof v === "string") out.putString(k, v);
    else if (typeof v === "boolean") out.putBoolean(k, v);
    else if (typeof v === "number") out.putInt(k, v);
    else if (typeof v === "object") out.put(k, jsObjectToCompound(v));
  }
  return out;
}

function mergeCompound(base, patch) {
  if (!patch) return base;
  if (!(patch instanceof CompoundTag)) patch = jsObjectToCompound(patch);
  let keys = patch.getAllKeys();
  for (let i = 0; i < keys.size(); i++) {
    let key = keys.get(i);
    let pv = patch.get(key);
    if (pv instanceof CompoundTag && base.contains(key, 10)) {
      mergeCompound(base.getCompound(key), pv);
    } else {
      base.put(key, pv);
    }
  }
  return base;
}

function setSingleActiveOil(stack, oilName, uses) {
  let tag = stack.getOrCreateTag();
  let oilsList = tag.get("Oils");
  if (!(oilsList instanceof ListTag)) {
    oilsList = new ListTag();
    tag.put("Oils", oilsList);
  }
  for (let i = 0; i < oilsList.size(); i++) {
    let entry = oilsList.get(i);
    if (entry.getString("Oil") === oilName) {
      let currentUses = entry.getInt("Uses");
      if (currentUses >= uses) return false;
      break;
    }
  }
  while (oilsList.size() > 0) oilsList.remove(0);
  let oilTag = new CompoundTag();
  oilTag.putString("Oil", oilName);
  oilTag.putInt("Uses", uses);
  oilsList.add(oilTag);
  return true;
}

function consumeOneOil(player) {
  let inv = player.getInventory();
  let carried = player.containerMenu.getCarried();
  if (!carried.isEmpty()) {
    let id = String(carried.getItem().id);
    if (vialIdToOilName(id)) {
      let newStack = carried.copy();
      newStack.shrink(1);
      player.containerMenu.setCarried(newStack.isEmpty() ? ItemStackCls.EMPTY : newStack);
      return true;
    }
  }
  for (let i = 0; i < inv.getContainerSize(); i++) {
    let s = inv.getItem(i);
    if (s.isEmpty()) continue;
    let id = String(s.getItem().id);
    if (vialIdToOilName(id)) {
      let newStack = s.copy();
      newStack.shrink(1);
      inv.setItem(i, newStack.isEmpty() ? ItemStackCls.EMPTY : newStack);
      return true;
    }
  }
  return false;
}

NetworkEvents.dataReceived("darkages:oil_action", event => {
  let player = event.player;
  let data = event.data;
  if (!player || !data) return;

  let inv = player.getInventory();

  let containerSlot = data.slot;
  if (typeof containerSlot !== "number") return;

  let slotObj = player.inventoryMenu.getSlot(containerSlot);
  if (!slotObj) return;

  let invSlot = slotObj.index;
  if (invSlot < 0 || invSlot >= inv.getContainerSize()) return;

  let target = inv.getItem(invSlot);
  if (target.isEmpty()) return;

  let item = target.getItem();
  if (!(item instanceof SwordItem) && !(item instanceof BowItem) && !(item instanceof CrossbowItem)) return;

  if (data.itemNbt && typeof data.itemNbt === "object") {
    target.setTag(mergeCompound(target.getOrCreateTag(), data.itemNbt));
  }

  let oilName = null;
  if (typeof data.oilName === "string") {
    oilName = data.oilName;
  } else {
    let carried = player.containerMenu.getCarried();
    if (!carried.isEmpty()) {
      let id = String(carried.getItem().id);
      oilName = vialIdToOilName(id);
    }
  }

  if (!oilName) return;

  let oilDef = findOilDefByName(oilName);
  if (!oilDef) return;

  if (!setSingleActiveOil(target, oilDef.oilName, oilDef.uses)) return;

  inv.setItem(invSlot, target);

  consumeOneOil(player);

  player.playNotifySound('entity.villager.work_cleric', 'master', 1, 1);
  player.containerMenu.broadcastChanges();
  player.inventoryMenu.broadcastFullState();
});

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal('oil')
      .requires(s => s.hasPermission(2))
      .then(
        Commands.argument('name', Arguments.STRING.create(event))
          .suggests((ctx, builder) => {
            for (const oil of global.oils) builder.suggest(oil.name);
            return builder.buildFuture();
          })
          .executes(ctx => {
            const name = Arguments.STRING.getResult(ctx, 'name');
            const oil = global.oils.find(o => o.name === name);
            if (!oil) return 0;
            const id = `darkages:${oil.name}_vial`;
            ctx.source.player.give(Item.of(id));
            return 1;
          })
      )
  );
});