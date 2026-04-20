ItemEvents.tooltip(tooltip => {
  tooltip.addAdvanced('darkages:contract', (item, advanced, text) => {
    if (!item.nbt) return;

    let isContract = item.nbt.contract;

    if (isContract) {
      if (isContract == 'resident') {
        contract(text, 'Residency', [
          'Allows players to sleep in the current town.'
        ]);
      }
      else if (isContract == 'land') {
        contract(text, 'Land Grant', [
          'Increases your land claims by 5.'
        ]);
      }
      else if (isContract == 'silver_mine') {
        contract(text, 'Silver Mine', [
          'Allows you to own a silver mine.',
          'Right click on a silver mine chest to claim it.'
        ]);
      }
      else if (isContract == 'gold_mine') {
        contract(text, 'Gold Mine', [
          'Allows you to own a gold mine.',
          'Right click on a gold mine chest to claim it.'
        ]);
      }
    }

    if (item.nbt.Contract) {
      const c = item.nbt.Contract;

      contract(text, `Deed to ${capitalize(c.Type)}`, [
        `Town: ${c.Town}`,
        `Location: ${c.getInt("x")}, ${c.getInt("z")}`
      ]);
    }
  });
});
ItemEvents.tooltip(tooltip => {
  tooltip.addAdvanced(Ingredient.all, (item, advanced, text) => {
    if (!item.nbt) return;
    let isStolen = item.nbt.Stolen
    if (isStolen == 1) {
      text.add(Text.of('Stolen').darkGray())
    }
  })
})

function contract(text, name, lines) {
  text.remove(0)
  text.add(0, Text.of(name).gold())

  lines.forEach((line, i) => {
    text.add(i + 1, Text.of(line).darkGray())
  })
}