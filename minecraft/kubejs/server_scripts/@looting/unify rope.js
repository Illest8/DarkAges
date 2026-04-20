LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
    .replaceLoot('quark:rope', 'supplementaries:rope')
})

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
    .replaceLoot('farmersdelight:rope', 'supplementaries:rope')
})