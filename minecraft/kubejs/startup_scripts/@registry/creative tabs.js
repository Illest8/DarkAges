StartupEvents.registry('creative_mode_tab', event => {
  let healingTab = event.create('darkages:healing', 'basic')
    .icon(() => Item.of('legendarysurvivaloverhaul:plaster'))
    .displayName(Text.gold('Healing'))
    .content(showRestricted => [
      'legendarysurvivaloverhaul:tonic',
      'legendarysurvivaloverhaul:plaster',
      'legendarysurvivaloverhaul:morphine',
      'legendarysurvivaloverhaul:medkit',
      'legendarysurvivaloverhaul:healing_herbs',
      'legendarysurvivaloverhaul:bandage',
      'vital_herbs:incense',
      'farmersdelight:canvas',
      'farmersdelight:straw'
    ])
})

StartupEvents.registry('creative_mode_tab', event => {
  event.create('darkages:alchemy', 'basic')
    .icon(() => Item.of('irons_spellbooks:alchemist_cauldron'))
    .displayName(Text.gold('Alchemy'))
    .content(showRestricted => [
      'irons_spellbooks:alchemist_cauldron',
      'darkages:echo_vial',
      'darkages:halo_vial',
      'darkages:judgement_vial',
      'darkages:parity_vial',
      'darkages:revenant_vial',
      'darkages:venom_vial',
      'irons_spellbooks:common_ink',
      'irons_spellbooks:uncommon_ink',
      'irons_spellbooks:rare_ink',
      'irons_spellbooks:epic_ink',
      'irons_spellbooks:legendary_ink'
    ])
})

StartupEvents.registry('creative_mode_tab', event => {
  event.create('darkages:smithing', 'basic')
    .icon(() => Item.of('overgeared:smithing_hammer'))
    .displayName(Text.gold('Smithing'))
    .content(showRestricted => [
      'overgeared:smithing_anvil',
      'magistuarmory:hilt',
      'overgeared:knappable_rock',
      'overgeared:copper_nugget',
      'minecraft:gold_nugget',
      'iceandfire:silver_nugget',
      'minecraft:iron_nugget',
      'overgeared:steel_nugget',
      'overgeared:diamond_shard',
      'minecraft:netherite_scrap',
      'minecraft:copper_ingot',
      'minecraft:gold_ingot',
      'iceandfire:silver_ingot',
      'minecraft:iron_ingot',
      'overgeared:steel_ingot',
      'minecraft:netherite_ingot',
      'overgeared:heated_copper_ingot',
      'overgeared:heated_silver_ingot',
      'overgeared:heated_iron_ingot',
      'overgeared:heated_steel_ingot',
      'overgeared:copper_plate',
      'darkages:gold_plate',
      'darkages:silver_plate',
      'overgeared:iron_plate',
      'overgeared:steel_plate',
      Item.of('overgeared:iron_tongs', '{Damage:0}'),
      Item.of('overgeared:steel_tongs', '{Damage:0}'),
      Item.of('overgeared:copper_smithing_hammer', '{Damage:0}'),
      Item.of('overgeared:smithing_hammer', '{Damage:0}')])
})