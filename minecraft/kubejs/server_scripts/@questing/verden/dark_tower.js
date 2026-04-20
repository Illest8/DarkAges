LootJS.modifiers(event => {
  event.addLootTableModifier('darkages:chests/tower_of_the_undead/treasure')
    .apply(action => {
      let player = action.player;
      if (questAvailable(player, '03C401979FDE5B80')) {
        completeQuest(player, '03C401979FDE5B80');
      }
    })
});

