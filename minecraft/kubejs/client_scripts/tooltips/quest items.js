
ItemEvents.tooltip(tooltip => {
  tooltip.addAdvanced(Ingredient.all, (item, advanced, text) => {
    if (!item.nbt) return;
    let isQuestItem = item.nbt.QuestItem
    if (isQuestItem == 1) {
      text.add(Text.of('Quest Item').darkGray())
    }
  })
})