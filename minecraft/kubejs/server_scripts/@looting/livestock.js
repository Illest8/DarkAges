LootJS.modifiers(event => {
  event
    .addLootTypeModifier(LootType.ENTITY)
    .directKillerPredicate((entity) => entity.type != 'minecraft:player')
    .removeLoot(ItemFilter.FOOD)
})