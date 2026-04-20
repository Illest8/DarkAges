const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
const $UUID = Java.loadClass('java.util.UUID');

function getUUID() {
  return $UUID.randomUUID().toString();
}

const armorItems = [
  'fantasy_armor:chess_board_knight_helmet',
  'fantasy_armor:chess_board_knight_chestplate',
  'fantasy_armor:chess_board_knight_leggings',
  'fantasy_armor:chess_board_knight_boots',

  'fantasy_armor:eclipse_soldier_helmet',
  'fantasy_armor:eclipse_soldier_chestplate',
  'fantasy_armor:eclipse_soldier_leggings',
  'fantasy_armor:eclipse_soldier_boots',

  'fantasy_armor:evening_ghost_helmet',
  'fantasy_armor:evening_ghost_chestplate',
  'fantasy_armor:evening_ghost_leggings',
  'fantasy_armor:evening_ghost_boots',

  'fantasy_armor:lady_maria_helmet',
  'fantasy_armor:lady_maria_chestplate',
  'fantasy_armor:lady_maria_leggings',
  'fantasy_armor:lady_maria_boots',

  'fantasy_armor:redeemer_boots',
  'fantasy_armor:redeemer_chestplate',
  'fantasy_armor:redeemer_helmet',
  'fantasy_armor:redeemer_leggings',

  'fantasy_armor:thief_helmet',
  'fantasy_armor:thief_chestplate',
  'fantasy_armor:thief_leggings',
  'fantasy_armor:thief_boots',

  'fantasy_armor:wandering_wizard_boots',
  'fantasy_armor:wandering_wizard_chestplate',
  'fantasy_armor:wandering_wizard_helmet',
  'fantasy_armor:wandering_wizard_leggings',

  'fantasy_armor:wind_worshipper_helmet',
  'fantasy_armor:wind_worshipper_chestplate',
  'fantasy_armor:wind_worshipper_leggings',
  'fantasy_armor:wind_worshipper_boots',

  'irons_spellbooks:archevoker_boots',
  'irons_spellbooks:archevoker_chestplate',
  'irons_spellbooks:archevoker_helmet',
  'irons_spellbooks:archevoker_leggings',

  'irons_spellbooks:cryomancer_boots',
  'irons_spellbooks:cryomancer_chestplate',
  'irons_spellbooks:cryomancer_helmet',
  'irons_spellbooks:cryomancer_leggings',

  'irons_spellbooks:cultist_boots',
  'irons_spellbooks:cultist_chestplate',
  'irons_spellbooks:cultist_helmet',
  'irons_spellbooks:cultist_leggings',

  'irons_spellbooks:electromancer_boots',
  'irons_spellbooks:electromancer_chestplate',
  'irons_spellbooks:electromancer_helmet',
  'irons_spellbooks:electromancer_leggings',

  'irons_spellbooks:plagued_boots',
  'irons_spellbooks:plagued_chestplate',
  'irons_spellbooks:plagued_helmet',
  'irons_spellbooks:plagued_leggings',

  'irons_spellbooks:priest_boots',
  'irons_spellbooks:priest_chestplate',
  'irons_spellbooks:priest_helmet',
  'irons_spellbooks:priest_leggings',

  'irons_spellbooks:pumpkin_helmet',
  'irons_spellbooks:pumpkin_chestplate',
  'irons_spellbooks:pumpkin_leggings',
  'irons_spellbooks:pumpkin_boots',

  'irons_spellbooks:pyromancer_boots',
  'irons_spellbooks:pyromancer_chestplate',
  'irons_spellbooks:pyromancer_helmet',
  'irons_spellbooks:pyromancer_leggings',

  'irons_spellbooks:shadowwalker_boots',
  'irons_spellbooks:shadowwalker_chestplate',
  'irons_spellbooks:shadowwalker_helmet',
  'irons_spellbooks:shadowwalker_leggings'
]

const toughnessItems = [
  'fantasy_armor:chess_board_knight_helmet',
  'fantasy_armor:chess_board_knight_chestplate',
  'fantasy_armor:chess_board_knight_leggings',
  'fantasy_armor:chess_board_knight_boots',

  'fantasy_armor:eclipse_soldier_helmet',
  'fantasy_armor:eclipse_soldier_chestplate',
  'fantasy_armor:eclipse_soldier_leggings',
  'fantasy_armor:eclipse_soldier_boots',

  'fantasy_armor:evening_ghost_helmet',
  'fantasy_armor:evening_ghost_chestplate',
  'fantasy_armor:evening_ghost_leggings',
  'fantasy_armor:evening_ghost_boots',

  'fantasy_armor:lady_maria_helmet',
  'fantasy_armor:lady_maria_chestplate',
  'fantasy_armor:lady_maria_leggings',
  'fantasy_armor:lady_maria_boots',

  'fantasy_armor:thief_helmet',
  'fantasy_armor:thief_chestplate',
  'fantasy_armor:thief_leggings',
  'fantasy_armor:thief_boots',

  'fantasy_armor:wandering_wizard_helmet',
  'fantasy_armor:wandering_wizard_chestplate',
  'fantasy_armor:wandering_wizard_leggings',
  'fantasy_armor:wandering_wizard_boots',

  'fantasy_armor:wind_worshipper_helmet',
  'fantasy_armor:wind_worshipper_chestplate',
  'fantasy_armor:wind_worshipper_leggings',
  'fantasy_armor:wind_worshipper_boots',

  'magistuarmoryaddon:dark_gothic_helmet',
  'magistuarmoryaddon:dark_gothic_chestplate',
  'magistuarmoryaddon:dark_gothic_leggings',
  'magistuarmoryaddon:dark_gothic_boots',

  'magistuarmoryaddon:scale_helmet',
  'magistuarmory:lamellar_chestplate',
  'magistuarmory:lamellar_boots',

  'magistuarmoryaddon:dark_crusader_helmet',
  'magistuarmoryaddon:dark_crusader_chestplate',
  'magistuarmoryaddon:dark_crusader_leggings',
  'magistuarmoryaddon:dark_crusader_boots'
]

const maxManaItems = [
  'fantasy_armor:wandering_wizard_helmet',
  'fantasy_armor:wandering_wizard_chestplate',
  'fantasy_armor:wandering_wizard_leggings',
  'fantasy_armor:wandering_wizard_boots',

  'irons_spellbooks:pumpkin_helmet',
  'irons_spellbooks:pumpkin_chestplate',
  'irons_spellbooks:pumpkin_leggings',
  'irons_spellbooks:pumpkin_boots',

  'minecraft:golden_helmet',
  'minecraft:golden_chestplate',
  'minecraft:golden_leggings',
  'minecraft:golden_boots'
]

ForgeEvents.onEvent("net.minecraftforge.event.ItemAttributeModifierEvent", event => {
  global.armorModifiers(event);
});

global.armorModifiers = event => {
  const id = event.itemStack.id

  if (armorItems.includes(id)) {
    removeVanilla(event, "minecraft:generic.armor")
  }

  if (maxManaItems.includes(id)) {
    removeVanilla(event, "irons_spellbooks:max_mana")
  }

  if (toughnessItems.includes(id)) {
    removeVanilla(event, "minecraft:generic.armor_toughness")
  }
}

function removeVanilla(event, attribute) {
  const map = event.modifiers.get(attribute)
  if (!map) return

  map.forEach((modifier, uuid) => {
    // Vanilla modifiers always have operation 0 and name "Armor modifier" or similar
    if (modifier.operation == 0 && modifier.name.toLowerCase().includes("modifier")) {
      event.removeModifier(attribute, uuid)
    }
  })
}