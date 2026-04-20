// Loot starting chest
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
        .apply((action) => {
            let player = action.player
            if (!player) return;
            if (!isInStructure(player, 'darkages:overworld/prison')) return;
            if (questCompleted(player, '0B0F21F9F1CACA98')) return;
            completeQuest(player, '0B0F21F9F1CACA98', 1)
        })
})



BlockEvents.broken(event => {
    let player = event.player;
    if (!player) return;
    if (event.block.id == 'minecraft:stone' && !questCompleted(player, '2C9825E26EDCC627')) {
        questProgessAdd(player, '33FAF5E476D5B273', 1)
    }
})


ItemEvents.entityInteracted(event => {
    let player = event.player
    if (!isInStructure(player, 'darkages:overworld/prison')) return;
    if (event.hand != 'main_hand') return;
    if (event.target.getType() == 'darkages:noble' && questAvailable(player, '06556EC1F36A6D8C')) {
        completeQuest(player, '06556EC1F36A6D8C')
        startAsyncLocate(player, 'town')
    }
})