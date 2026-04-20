LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.FISHING)
    .playerPredicate(player => !questCompleted(player, '636F9A03611F0F11') && questCompleted(player, '282F25FB7854C48B'))
    .randomChance(0.05)
    .apply(action => {
        let player = action.player;
        if (!player) return;
        completeQuest(player, '636F9A03611F0F11')
    })
    .addLoot(LootEntry.of('darkages:contract'))
})