LootJS.modifiers((event) => {
  event
    .addLootTypeModifier(LootType.CHEST)
    .playerAction((player) => {
      if (isInLawStructure(player) && player.persistentData.identity == 'thief') {
        player.giveExperiencePoints(Math.floor(Math.random() * 5))
        return;
      }
      if (!isInLawStructure(player)) {
        player.giveExperiencePoints(Math.floor(Math.random() * 5))
      }
    });
})

LootJS.modifiers((event) => {
  event
    .addLootTypeModifier(LootType.FISHING)
    .dropExperience(0)
    .playerAction((player) => player.giveExperiencePoints(Math.floor(Math.random() * 4)));
})

let oreXpSources = {
  'darkages:scrap_metal_ore': 1,
  'darkages:timeworn_fabric_ore': 2,
  'darkages:luminous_crystal_ore': 3,
  'darkages:arcane_sands_ore': 4,
  'darkages:godforged_pearl_ore': 5
}

Object.entries(oreXpSources).forEach(([ore, xp]) => {
  LootJS.modifiers(event => {
    event.addBlockLootModifier(ore)
      .playerAction(player => {
        let calculation = ((Math.random() + 1) * 20) * xp
        player.giveExperiencePoints(Math.floor(calculation))
      })
  })
})

LootJS.modifiers((event) => {
  event.addBlockLootModifier(BlockStatePredicate.of("#minecraft:crops"))
    .randomChance(0.2)
    .playerAction((player) => player.giveExperiencePoints((1 + player.getAttributeValue('darkages:farming'))));
});

LootJS.modifiers((event) => {
  event.addBlockLootModifier([
    'vital_herbs:sooth_blossom_plant',
    'vital_herbs:bleeding_heart_plant',
    'vital_herbs:blue_spar_plant',
    'vital_herbs:crimson_lily_plant',
    'vital_herbs:fizz_fruit_plant',
    'vital_herbs:needle_heart_plant',
    'vital_herbs:snap_pepper_plant',
    'vital_herbs:tox_kiss_plant'
  ])
    .randomChance(0.5)
    .playerAction((player) => {
      player.giveExperiencePoints((player.getAttributeValue('darkages:foraging') * 5))
    })
});

MerchantEvents.afterTrade(event => {
  event.offer.setRewardExp(false)
  let player = event.player
  if (!player.server) return;
  let playerTradeLevel = player.getAttributeTotalValue('darkages:trading')
  if (playerTradeLevel == 0) return;
  let calculation = 3 + (playerTradeLevel * (Math.ceil(Math.random() * 3)))
  player.giveExperiencePoints(Math.floor(calculation))
});