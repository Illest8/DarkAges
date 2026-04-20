ItemEvents.tooltip((tooltip) => {
  const armorArr = Ingredient.of(/shield|buckler|ellipticalshield|heatershield|kiteshield|rondache|roundshield|_target/).itemIds;

  armorArr.forEach((itemId) => {
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

        if (/Block|Draw|Gravity|Impact|Cold|Fire Damage|Fire Spell|Shred|Cast|Cooldown|Crit|Experience|Healing|Life| Luck|Mana|Health|Stamina|Mining|Overheal|Projectile|Speed |Spell |Swim /.test(text.get(i).string)) continue;

        // LIST OF REMOVED TOOLTIPS
        if (removeInfo.contains('weight') || removeInfo.startsWith(' ') || removeInfo.startsWith('-') || removeInfo.startsWith('+')|| removeInfo.startsWith('When') || removeInfo.endsWith(' I') || removeInfo.endsWith(' II') || removeInfo.endsWith(' III') || removeInfo.endsWith(' IV') || removeInfo.endsWith(' V') || removeInfo.startsWith("Infinity") || removeInfo.startsWith("Flame") || removeInfo.startsWith("Multishot") || removeInfo.startsWith("Channeling")) {
          storedTextArr.push(text.get(i));
        }
      }

      // KEEP
      for (let i = 0; i < text.length; i++) {

        // LIST OF KEEP TOOLTIPS
        if (/Block|Draw|Impact|Cold|Fire|Shred|Cast|Cooldown|Gravity| Crit|Experience|Healing|Life| Luck| Mana|Max Health|Stamina|Mining|Overheal|Projectile|Speed |Spell |Swim /.test(text.get(i).string)) {
          savedTextArr.push(text.get(i));
          isStat = true
        }
      }

      // REMOVE UNWANTED ATTRIBUTES
      for (let i = 0; i < storedTextArr.length; i++) {
        text.remove(storedTextArr[i])
      }

      if (!tooltip.shift && isStat) {
        text.remove(1)
        for (let i = 0; i < savedTextArr.length; i++) {
          text.remove(savedTextArr[i])
        }
      }

      if (tooltip.shift && isStat) {
        text.add(1, Text.of('Shield Stats:').blue());
        text.remove(2);
      }

      const sharpTool = item?.nbt?.sharper;
      const owner = item?.nbt?.Owner;
      if (!sharpTool && !owner && tooltip.shift) return
      if (sharpTool) {
        text.add([Text.of(' \uE019 '), Text.of(sharpTool + ' Uses').darkRed()]);
      }
      if (owner) {
        text.add([Text.of(' \uE004 '), Text.of(owner).gold()]);
      }
    });
  });
});
