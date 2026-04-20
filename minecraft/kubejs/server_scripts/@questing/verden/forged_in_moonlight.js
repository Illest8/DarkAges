
ItemEvents.crafted(event => {
  let { player, item } = event;
  let quest = '21E18E3C95B3B5C0'
  if (questAvailable(player, quest) && item.hasTag('darkages:silver_weapons')) {
    completeQuest(player, quest)
  }
})
