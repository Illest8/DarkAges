ItemEvents.tooltip((tooltip) => {
  const swordArr = Ingredient.of(/wooden_axe|iron_axe|golden_axe|stone_axe|diamond_axe|netherite_axe|shovel|hoe|pickaxe|fishing_rod/).itemIds;

  swordArr.forEach((itemId) => {
    tooltip.addAdvanced(itemId, (item, advanced, text) => {
      const storedEnchArr = [];
      const storedEnchDescArr = [];
      const storedTextArr = [];
      let isEnch = false

      for (let i = 0; i < text.length; i++) {

        if (/Attack Damage|Attack Speed|Entity Reach|Enemies/.test(text.get(i).string)) continue;

        if (text.get(i).string.startsWith(' ')) {
          storedTextArr.push(text.get(i));
        }
      }

      if (item.isEnchanted()) {
      for (let i = 0; i < text.length; i++) {
        let enchInfo = text.get(i).string
        let enchDesc = text.get(i)?.contents?.key
          if (enchInfo.endsWith(' I') || enchInfo.endsWith(' II') || enchInfo.endsWith(' III') || enchInfo.endsWith(' IV') || enchInfo.endsWith(" V") || enchInfo.startsWith("Curse") || enchInfo.startsWith("Mending") || enchInfo.startsWith("Silk")) {
            storedEnchArr.push(enchInfo)
            isEnch = true
        }
        if (enchDesc != null && enchDesc.startsWith("enchantment.") && !enchDesc.endsWith(".desc")) {
          storedEnchDescArr.push(enchDesc)
        }
      }
    }

      let name = text.get(0);
      text.removeIf((e) => e != name);

      // Enchantments
      if (!tooltip.ctrl && isEnch) {
        for (let i = 0; i < storedEnchArr.length; i++) {
          if (!storedEnchArr[i].startsWith("Curse")) {
            text.add(text.length, Text.of(' ' + storedEnchArr[i]).darkAqua());
          }
          else {
            text.add(text.length, Text.of(' ' + storedEnchArr[i]).red());
          }
        }
      }
      else {
        for (let i = 0; i < storedEnchDescArr.length; i++) {
          text.add(text.length, [Text.of(''), Text.translate(storedEnchDescArr[i] + ".desc").italic().darkGray()]);
        }
      }

      for (let i = 0; i < storedTextArr.length; i++) {
        text.add(text.length, storedTextArr[i])
      }

      // Owner
       if (item.nbt && item.nbt.Creator) {
        text.add(Text.of(`\uE004 ${item.nbt.Creator}`).darkGray())
      }
    });
  });
});
