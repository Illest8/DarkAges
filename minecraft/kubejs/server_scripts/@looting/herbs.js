
const plants = [
  'vital_herbs:sooth_blossom_plant',
  'vital_herbs:bleeding_heart_plant',
  'vital_herbs:blue_spar_plant',
  'vital_herbs:crimson_lily_plant',
  'vital_herbs:fizz_fruit_plant',
  'vital_herbs:needle_heart_plant',
  'vital_herbs:snap_pepper_plant',
  'vital_herbs:tox_kiss_plant'
]

plants.forEach(plant => {
  LootJS.modifiers(event => {
    const seedId = plant.replace('_plant', '_seeds')
    event.addBlockLootModifier([plant])
      .randomChance(0.95)
      .removeLoot(Ingredient.of(seedId))
  })
})
