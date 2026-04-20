ItemEvents.tooltip((tooltip) => {
   var allWeaponIds = [];
  for (var type in global.weaponRegistry) {
    var arr = global.weaponRegistry[type];
    for (var i = 0; i < arr.length; i++) {
      allWeaponIds.push(arr[i].id);
    }
  }

  allWeaponIds.forEach(function(itemId) {

    tooltip.addAdvanced(itemId, function(item, advanced, text) {

      //store every tooltip element in an array that does not contain Attack Damage/Speed and starts with space/+/- int
      const storedTextArr = [];
      const storedEnchArr = [];
      const savedTextArr = [];
      const storedEnchDescArr = [];
      let isStat = false
      let isEnch = false

      // REMOVE
      for (let i = 0; i < text.length; i++) {
        let removeInfo = text.get(i).string

        if (/Draw|HP|Impact|Cold| Fire| Shred|Cast|Cooldown|Crit |Experience|Healing|Life|Luck| Mana |Health|Stamina |Mining|Overheal|Projectile| Move | Spell |Swim/.test(text.get(i).string)) continue;

        // LIST OF REMOVED TOOLTIPS
        if (/*removeInfo.startsWith(' ') ||  removeInfo.startsWith('When') || */removeInfo.startsWith('-') || removeInfo.startsWith('+') || removeInfo.endsWith(' I') || removeInfo.endsWith(' II') || removeInfo.endsWith(' III') || removeInfo.endsWith(' IV') || removeInfo.endsWith(' V') || removeInfo.startsWith("Infinity") || removeInfo.startsWith("Flame") || removeInfo.startsWith("Multishot") || removeInfo.startsWith("Channeling")) {
          storedTextArr.push(text.get(i));
        }
      }

      // KEEP
      for (let i = 0; i < text.length; i++) {

        // LIST OF KEEP TOOLTIPS
        if (/Draw|HP|Impact|Cold| Fire| Shred|Cast|Cooldown|Crit |Experience|Healing|Life|Luck| Mana |Health|Stamina |Mining|Overheal|Projectile| Move | Spell |Swim/.test(text.get(i).string)) {
          savedTextArr.push(text.get(i));
          isStat = true
        }
      }

      if ((item.isEnchanted())) {
        for (let i = 0; i < text.length; i++) {
          let enchInfo = text.get(i).string
          let enchDesc = text.get(i)?.contents?.key
          if (enchInfo.endsWith(' I') || enchInfo.endsWith(' II') || enchInfo.endsWith(' III') || enchInfo.endsWith(' IV') || enchInfo.endsWith(" V") || enchInfo.startsWith("Curse") || enchInfo.startsWith("Infinity") || enchInfo.startsWith("Flame") || enchInfo.startsWith("Multishot") || enchInfo.startsWith("Channeling") || enchInfo.startsWith("Mending")) {
            storedEnchArr.push(enchInfo)
            isEnch = true
          }
          if (enchDesc != null && enchDesc.startsWith("enchantment.") && !enchDesc.endsWith(".desc")) {
            storedEnchDescArr.push(enchDesc)
          }
        }
      }

      if (item.nbt && item.nbt.Creator) {
        text.add(Text.of(`\uE004 ${item.nbt.Creator}`).darkGray())
      }

      // REMOVE UNWANTED ATTRIBUTES
      for (let i = 0; i < storedTextArr.length; i++) {
        text.remove(storedTextArr[i])
      }

      if (!isStat && !isEnch) {
        text.remove(1);
        if (item.nbt.darkages && item.nbt.darkages.toString().includes('_offense')) {
          text.add([Text.of(`Style: `).gray(), Text.of('Offense').red()])
        }
        // if (!item.nbt.toString().includes('affix_data') && !tooltip.shift) {
        //   text.add(Text.of('This item lacks aura.').darkGray())
        // }
        return;
      }

      if (!tooltip.shift && isStat) {
        text.remove(1)
        for (let i = 0; i < savedTextArr.length; i++) {
          text.remove(savedTextArr[i])
        }
      }

      if (tooltip.shift && isStat) {
        text.add(1, Text.of('Weapon Stats:').blue())
        text.remove(2);
      }

      // Enchantments
      if (!tooltip.ctrl && isEnch) {
        if (!isStat) text.remove(1);
        for (let i = 0; i < storedEnchArr.length; i++) {
          if (!storedEnchArr[i].startsWith("Curse")) {
            text.add(1 + i, Text.of('' + storedEnchArr[i]).darkAqua());
          }
          else {
            text.add(1 + i, Text.of('' + storedEnchArr[i]).red());
          }
        }
      }
      else {
        if (!isStat) text.remove(1);
        for (let i = 0; i < storedEnchDescArr.length; i++) {
          text.add(1 + i, [Text.of(''), Text.translate(storedEnchDescArr[i] + ".desc").italic().darkGray()]);
        }
      }

      // if (!item.nbt.toString().includes('affix_data') && !tooltip.shift) {
      //   text.add(Text.of('This item lacks aura.').darkGray())
      // }
    });
  });
});