// WANDERING WIZARD -> SPECIALTY MAGE ARMORS (ISS)

let armorTypes = {
  'irons_spellbooks:priest_helmet': 'irons_spellbooks:holy_rune',
  'irons_spellbooks:priest_chestplate': 'irons_spellbooks:holy_rune',
  'irons_spellbooks:priest_leggings': 'irons_spellbooks:holy_rune',
  'irons_spellbooks:priest_boots': 'irons_spellbooks:holy_rune',
  'irons_spellbooks:pyromancer_helmet': 'irons_spellbooks:fire_rune',
  'irons_spellbooks:pyromancer_chestplate': 'irons_spellbooks:fire_rune',
  'irons_spellbooks:pyromancer_leggings': 'irons_spellbooks:fire_rune',
  'irons_spellbooks:pyromancer_boots': 'irons_spellbooks:fire_rune',
  'irons_spellbooks:cryomancer_helmet': 'irons_spellbooks:ice_rune',
  'irons_spellbooks:cryomancer_chestplate': 'irons_spellbooks:ice_rune',
  'irons_spellbooks:cryomancer_leggings': 'irons_spellbooks:ice_rune',
  'irons_spellbooks:cryomancer_boots': 'irons_spellbooks:ice_rune',
  'irons_spellbooks:electromancer_helmet': 'irons_spellbooks:lightning_rune',
  'irons_spellbooks:electromancer_chestplate': 'irons_spellbooks:lightning_rune',
  'irons_spellbooks:electromancer_leggings': 'irons_spellbooks:lightning_rune',
  'irons_spellbooks:electromancer_boots': 'irons_spellbooks:lightning_rune',
  'irons_spellbooks:archevoker_helmet': 'irons_spellbooks:evocation_rune',
  'irons_spellbooks:archevoker_chestplate': 'irons_spellbooks:evocation_rune',
  'irons_spellbooks:archevoker_leggings': 'irons_spellbooks:evocation_rune',
  'irons_spellbooks:archevoker_boots': 'irons_spellbooks:evocation_rune',
  'irons_spellbooks:cultist_helmet': 'irons_spellbooks:blood_rune',
  'irons_spellbooks:cultist_chestplate': 'irons_spellbooks:blood_rune',
  'irons_spellbooks:cultist_leggings': 'irons_spellbooks:blood_rune',
  'irons_spellbooks:cultist_boots': 'irons_spellbooks:blood_rune',
  'irons_spellbooks:shadowwalker_helmet': 'irons_spellbooks:ender_rune',
  'irons_spellbooks:shadowwalker_chestplate': 'irons_spellbooks:ender_rune',
  'irons_spellbooks:shadowwalker_leggings': 'irons_spellbooks:ender_rune',
  'irons_spellbooks:shadowwalker_boots': 'irons_spellbooks:ender_rune',
  'irons_spellbooks:plagued_helmet': 'irons_spellbooks:nature_rune',
  'irons_spellbooks:plagued_chestplate': 'irons_spellbooks:nature_rune',
  'irons_spellbooks:plagued_leggings': 'irons_spellbooks:nature_rune',
  'irons_spellbooks:plagued_boots': 'irons_spellbooks:nature_rune',
}

ServerEvents.recipes(event => {
  for (let i in armorTypes) {
    if (i.endsWith('helmet')) {
      event.smithing(
        i,
        'fantasy_armor:moon_crystal',
        'fantasy_armor:wandering_wizard_helmet',
        armorTypes[i]
      )
    }
    if (i.endsWith('chestplate')) {
      event.smithing(
        i,
        'fantasy_armor:moon_crystal',
        'fantasy_armor:wandering_wizard_chestplate',
        armorTypes[i]
      )
    }
    if (i.endsWith('leggings')) {
      event.smithing(
        i,
        'fantasy_armor:moon_crystal',
        'fantasy_armor:wandering_wizard_leggings',
        armorTypes[i]
      )
    }
    if (i.endsWith('boots')) {
      event.smithing(
        i,
        'fantasy_armor:moon_crystal',
        'fantasy_armor:wandering_wizard_boots',
        armorTypes[i]
      )
    }
  }
})