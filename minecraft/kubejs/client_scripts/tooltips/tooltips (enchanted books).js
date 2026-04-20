ItemEvents.tooltip((tooltip) => {

  const enchantedBook = Ingredient.of('minecraft:enchanted_book')

    tooltip.addAdvanced(enchantedBook, (item, advanced, text) => {
      const storedEnchArr = [];
      const storedEnchDescArr = [];
      let isEnch = false

      for (let i = 0; i < text.length; i++) {
        let enchInfo = text.get(i).string
        let enchDesc = text.get(i)?.contents?.key
          if (enchInfo.endsWith(' I') || enchInfo.endsWith(' II') || enchInfo.endsWith(' III') || enchInfo.endsWith(' IV') || enchInfo.endsWith(" V") || enchInfo.startsWith("Curse") || enchInfo.startsWith("Mending") || enchInfo.startsWith("Silk") || enchInfo.startsWith("Aqua") || enchInfo.startsWith("Thermal") || enchInfo.startsWith("Infinity") || enchInfo.startsWith("Flame") || enchInfo.startsWith("Multishot") || enchInfo.startsWith("Channeling")) {
            storedEnchArr.push(enchInfo)
            isEnch = true
        }
        if (enchDesc != null && enchDesc.startsWith("enchantment.") && !enchDesc.endsWith(".desc")) {
          storedEnchDescArr.push(enchDesc)
        }
      }

      let name = text.get(0);
      text.removeIf((e) => e != name);

      // Enchantments
      if (!tooltip.ctrl && isEnch) {
        for (let i = 0; i < storedEnchArr.length; i++) {
          if (!storedEnchArr[i].startsWith("Curse")) {
            text.add(text.length, [Text.of('\uE018 '), Text.of(storedEnchArr[i]).darkAqua()]);
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
    });
});
