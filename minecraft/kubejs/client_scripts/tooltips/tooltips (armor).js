ItemEvents.tooltip((tooltip) => {
  const armorArr = Ingredient.of(/sallet|armet|barbute|kulah|bascinet|gambeson|burgonet|chapel|sturmhaube|pantyhose|shishak|coif|cabasset|doublet|silvered|kettlehat|bicoque|cervelliere|morion|tunic|greathelm|helmet|chestplate|leggings|boots/).itemIds;

  armorArr.forEach((itemId) => {
    if (itemId.includes('decoration')) return;
    tooltip.addAdvanced(itemId, (item, advanced, text) => {
      const storedTextArr = [];
      const storedEnchArr = [];
      const savedTextArr = [];
      const storedEnchDescArr = [];
      let isStat = false
      let isEnch = false

      // REMOVE
      for (let i = 0; i < text.length; i++) {
        let removeInfo = text.get(i).string

        if (/Draw|Gravity|Impact|Cold|Fire Damage|Fire Spell|Shred|Cast|Cooldown|Crit|Experience|Healing|Life| Luck|Max Mana|Mana Regen|Health|Max Stamina|Mining|Overheal|Projectile|Stealth|Speed |Spell |Swim /.test(text.get(i).string)) continue;

        // LIST OF REMOVED TOOLTIPS
        if (removeInfo.startsWith(' ') || removeInfo.startsWith('-') || removeInfo.startsWith('+') || removeInfo.startsWith('When') || removeInfo.startsWith('Dyed') || removeInfo.endsWith(' I') || removeInfo.endsWith(' II') || removeInfo.endsWith(' III') || removeInfo.endsWith(' IV') || removeInfo.endsWith(' V') || removeInfo.startsWith("Infinity") || removeInfo.startsWith("Flame") || removeInfo.startsWith("Mending") || removeInfo.startsWith("Aqua") || removeInfo.startsWith("Multishot") || removeInfo.startsWith("Channeling")) {
          storedTextArr.push(text.get(i));
        }
      }

      // KEEP
      for (let i = 0; i < text.length; i++) {

        // LIST OF KEEP TOOLTIPS
        if (/Draw|Impact|Cold| Fire|Shred|Cast|Cooldown|Gravity| Crit|Experience|Healing|Life| Luck|Max Mana|Mana Regen|Max Health|Max Stamina|Mining|Overheal|Projectile Damage|Stealth|Speed |Spell |Swim /.test(text.get(i).string)) {
          savedTextArr.push(text.get(i));
          isStat = true
        }
      }

       if (item.nbt && item.nbt.Creator) {
        text.add(Text.of(`\uE004 ${item.nbt.Creator}`).darkGray())
      }

      if ((item.isEnchanted())) {
        for (let i = 0; i < text.length; i++) {
          let enchInfo = text.get(i).string
          let enchDesc = text.get(i)?.contents?.key
          if (enchInfo.endsWith(' I') || enchInfo.endsWith(' II') || enchInfo.endsWith(' III') || enchInfo.endsWith(' IV') || enchInfo.endsWith(" V") || enchInfo.startsWith("Curse") || enchInfo.startsWith("Infinity") || enchInfo.startsWith("Flame") || enchInfo.startsWith("Aqua") || enchInfo.startsWith("Mending")) {
            storedEnchArr.push(enchInfo)
            isEnch = true
          }
          if (enchDesc != null && enchDesc.startsWith("enchantment.") && !enchDesc.endsWith(".desc")) {
            storedEnchDescArr.push(enchDesc)
          }
        }
      }

      // REMOVE UNWANTED ATTRIBUTES
      for (let i = 0; i < storedTextArr.length; i++) {
        text.remove(storedTextArr[i])
        if (text.isEmpty()) text.remove(i)
      }

      if (!tooltip.shift) {
        text.remove(1)
        for (let i = 0; i < savedTextArr.length; i++) {
          text.remove(savedTextArr[i])
          if (text.isEmpty()) text.remove(i)
        }
      }

      if (tooltip.shift && isStat) {
        text.add(1, Text.of('Armor Stats:').blue());
        text.remove(2);
      }

      // Enchantments
      if (!tooltip.ctrl && isEnch) {
        for (let i = 0; i < storedEnchArr.length; i++) {
          if (!storedEnchArr[i].startsWith("Curse")) {
            text.add(1 + i, Text.of('' + storedEnchArr[i]).darkAqua());
            if (text.isEmpty()) text.remove(i)
          }
          else {
            text.add(1 + i, Text.of('' + storedEnchArr[i]).red());
          }
        }
      }
      else {
        for (let i = 0; i < storedEnchDescArr.length; i++) {
          text.add(1 + i, [Text.of(''), Text.translate(storedEnchDescArr[i] + ".desc").italic().darkGray()]);
        }
      }
    });
  });
});
