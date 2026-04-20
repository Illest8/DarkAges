ClientEvents.lang("en_us", event => {

  // HEAVY WEAPONS
  let heavyAttr = {
    annihilating: "Annihilating",
    berserking: "Berserking",
    decimating: "Decimating",
    forceful: "Forceful",
    giant_slaying: "Gargantuan",
    murderous: "Honed",
    shredding: "Shredding"
  }
  let heavySuffix = {
    annihilating: "of Prevalence",
    berserking: "of Rage",
    decimating: "of Critical Blows",
    forceful: "of Might",
    giant_slaying: "of Colossal Blows",
    murderous: "of Fierceness",
    shredding: "of Cleaving"
  }

  // SWORDS
  let swordAttr = {
    glacial: "Glacial",
    graceful: "Graceful",
    infernal: "Molten",
    intricate: "Intricate",
    lacerating: "Critical",
    vampiric: "Vampiric",
    violent: "Jagged",
    lightweight: "Lightweight"
  }
  let swordSuffix = {
    glacial: "of Freezing",
    graceful: "of Quick Strikes",
    infernal: "of the Infernal",
    intricate: "of Critical Chance",
    lacerating: "of Critical Damage",
    vampiric: "of Bloodletting",
    violent: "of Extra Damage",
    lightweight: "of Balance"
  }

  // RANGED
  let rangedAttr = {
    crit_chance: "Chanced",
    crit_damage: "Critical",
    stamina: "Enduring",
    damage: "Vicious"
  }

  let rangedSuffix = {
    crit_chance: "of Chance",
    crit_damage: "of Critical Damage",
    stamina: "of Stamina",
    damage: "of Extra Damage"
  }

  // ARMOR
  let armorAttr = {
    aquatic: "Siren's",
    blessed: "Blessed",
    fortunate: "Lucky",
    gravitational: "Gravitational",
    ironforged: "Strengthened",
    mana_recovery: "Mana-Boosting",
    spiritual: "Paladin's",
    stamina: "Enduring",
    stamina_regen: "Lightweight",
    steel_touched: "Tough",
    windswept: "Quick"
  }
  let armorSuffix = {
    aquatic: "of Swimming",
    blessed: "of Health",
    fortunate: "of the Bountiful",
    gravitational: "of Low Mass",
    ironforged: "of Protection",
    mana_recovery: "of Mana Recovery",
    spiritual: "of Health Recovery",
    stamina: "of Stamina",
    stamina_regen: "of Stamina Regen",
    steel_touched: "of Toughness",
    windswept: "of Speed"
  }

  // SPELLBOOK
  let spellbookAttr = {
    blood_spell_power: "Cultist's",
    cast_time_reduction: "Quick",
    ender_spell_power: "Enderman's",
    evocation_spell_power: "Evoker's",
    fire_spell_power: "Dragon's",
    holy_spell_power: "Priest's",
    ice_spell_power: "Cryomancer's",
    lightning_spell_power: "Charged",
    mana: "Wizard's",
    nature_spell_power: "Apothecary's"
  }
  let spellbookSuffix = {
    blood_spell_power: "of Blood",
    cast_time_reduction: "of Spell Haste",
    ender_spell_power: "of Ender",
    evocation_spell_power: "of Evocation",
    fire_spell_power: "of Flames",
    holy_spell_power: "of Divinity",
    ice_spell_power: "of Frost",
    lightning_spell_power: "of Lightning",
    mana: "of Plentiful Mana",
    nature_spell_power: "of Nature"
  }

  // APPLY AFFIXXES
  for (let i in swordAttr) {
    event.add("affix.apotheosis:sword/attribute/" + i, swordAttr[i])
  }
  for (let i in swordSuffix) {
    event.add("affix.apotheosis:sword/attribute/" + i + ".suffix", swordSuffix[i])
  }
  for (let i in heavyAttr) {
    event.add("affix.apotheosis:heavy_weapon/attribute/" + i, heavyAttr[i])
  }
  for (let i in heavySuffix) {
    event.add("affix.apotheosis:heavy_weapon/attribute/" + i + ".suffix", heavySuffix[i])
  }
  for (let i in rangedAttr) {
    event.add("affix.apotheosis:ranged/attribute/" + i, rangedAttr[i])
  }
  for (let i in rangedSuffix) {
    event.add("affix.apotheosis:ranged/attribute/" + i + ".suffix", rangedSuffix[i])
  }
  for (let i in armorAttr) {
    event.add("affix.apotheosis:armor/attribute/" + i, armorAttr[i])
  }
  for (let i in armorSuffix) {
    event.add("affix.apotheosis:armor/attribute/" + i + ".suffix", armorSuffix[i])
  }
  for (let i in spellbookAttr) {
    event.add("affix.irons_spellbooks:spellbook/attribute/" + i, spellbookAttr[i])
  }
  for (let i in spellbookSuffix) {
    event.add("affix.irons_spellbooks:spellbook/attribute/" + i + ".suffix", spellbookSuffix[i])
  }

  // IRON'S SPELLBOOKS (MOD) 
  event.add("affix.irons_spellbooks:armor/attribute/mana", "Intelligent")
  event.add("affix.irons_spellbooks:armor/attribute/mana.suffix", "of the Intelligent")
  event.add("affix.irons_spellbooks:armor/attribute/cooldown", "Quick-Minded")
  event.add("affix.irons_spellbooks:armor/attribute/cooldown.suffix", "of the Fast-Wit")
  event.add("affix.irons_spellbooks:armor/attribute/spell_power", "Spellcasting")
  event.add("affix.irons_spellbooks:armor/attribute/spell_power.suffix", "of the Spellcaster")
  event.add("affix.irons_spellbooks:armor/attribute/spell_resist", "Spellshielded")
  event.add("affix.irons_spellbooks:armor/attribute/spell_resist.suffix", "of the Magehunter")
  event.add("affix.irons_spellbooks:sword/attribute/spell_power", "Spellcasting")
  event.add("affix.irons_spellbooks:sword/attribute/spell_power.suffix", "of the Spellcaster")
  event.add("affix.irons_spellbooks:sword/attribute/mana_regen", "Augmented")
  event.add("affix.irons_spellbooks:sword/attribute/mana_regen.suffix", "of Rebirth")

  event.add("affix.apotheosis:sword/mob_effect/paralysis", "Paralyzing")
    event.add("affix.apotheosis:sword/mob_effect/stamina_charge", "Empowering")
  event.add("affix.apotheosis:shield/attribute/blocking", "Stalwart")

  // DARKAGES (RING CURIOS)
  let ringAttr = {
    blood_spell_power: 'Bloody',
    ender_spell_power: 'Ender',
    evocation_spell_power: 'Illager',
    fire_spell_power: 'Fiery',
    holy_spell_power: 'Holy',
    ice_spell_power: 'Icy',
    lightning_spell_power: 'Lightning',
    nature_spell_power: 'Druid'
  }

  let ringSuffix = {
    blood_spell_power: 'of Blood',
    ender_spell_power: 'of The End',
    evocation_spell_power: 'of Evocation',
    fire_spell_power: 'of Fire',
    holy_spell_power: 'of Blessings',
    ice_spell_power: 'of Ice',
    lightning_spell_power: 'of Lightning',
    nature_spell_power: 'of Nature'
  }

  for (let i in ringAttr) {
    event.add("affix.darkages:ring/attribute/" + i, ringAttr[i])
    event.add("affix.darkages:ring/attribute/" + i + ".suffix", ringSuffix[i])
  }

  // Random changes
  event.add("rarity.apotheosis:mythic", "Legendary")
})