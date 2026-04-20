ClientEvents.lang("en_us", event => {

  // Adds/edits the information tab
  event.add("info.apotheosis.gem_crushing", "Magic Dust is used as a base ingredient to reforge items.\n\nCan be salvaged from gems in a Salvaging Table or by being crushed under an anvil.")
})

let cF = '             \u00A7f\uE091\n\n\n'

JEIEvents.information(event => {
  event.addItem('epicfight:skillbook', '\n§fUpon \uE011 this book, you can choose to apply this skill to your character.')
  event.addItem('darkages:coin', 'Base currency used for trading.')
  event.addItem('supplementaries:rope_arrow', 'Once shot onto a full block, a rope will descend underneath, allowing the player to climb.')
  event.addItem('supplementaries:slingshot', 'Shoots blocks!')
  event.addItem('supplementaries:key', 'Keys will lock/unlock any blocks that share the same name.')
  event.addItem('supplementaries:altimeter', '\n§f\uE011 will display your current height.')
  event.addItem('supplementaries:bomb_blue', '\n§f\uE011 to throw.\n\nWill not start to fuse until it has hit the ground, after 10 seconds, explodes dealing massive damage in a 5 block radius.')
  event.addItem('supplementaries:bomb', '\n§f\uE011 to throw.\n\nWill damage all mobs in a 3 block radius while knocking them back.\n\nDoes not break blocks.')
  event.addItem('supplementaries:quiver', '\n§f\uE011 an arrow on the quiver will place the arrow inside.\n\nYou can select which arrow to shoot by holding \'H\' and scrolling to the preferred arrow.')
  event.addItem('supplementaries:wrench', '\n§f\uE011 on a block will rotate it 90 degrees.')
  event.addItem('iceandfire:manuscript', 'Crafting 3 pages with a bestiary at a Bestiary Lectern will unlock new information on beasts.')
  event.addItem('mca:blueprint', 'A useful item to manage villages. You can manually add/edit buildings to serve different funtions, view the building catalog, and view your reputation.')
  event.addItem('apotheosis:sigil_of_rebirth', `A \"fuel\" used at a reforging table to add affixes to an item, similar to enchanting.\n\n§fStarting a trade with a merchant while holding this item will reroll the marhcant's trades.`)
  event.addItem('mca:matchmakers_ring', 'Using a pair of matchmaker rings on 2 townsfolk near eachother will marry them.')
  event.addItem('fantasy_armor:thief_helmet', '\n§fWhile wearing this armor set you cannot get caught stealing.')
  event.addItem('fantasy_armor:thief_chestplate', '\n§fWhile wearing this armor set you cannot get caught stealing.')
  event.addItem('fantasy_armor:thief_leggings', '\n§fWhile wearing this armor set you cannot get caught stealing.')
  event.addItem('fantasy_armor:thief_boots', '\n§fWhile wearing this armor set you cannot get caught stealing.')
  event.addItem('iceandfire:blindfold', '\n§fWearer will be blinded. People who are weaing blindfolds cannot catch you stealing.')
  event.addItem('travelersbackpack:bat', 'Obtainable in Mine shafts and Dungeons')
  event.addItem('travelersbackpack:iron_golem', `Obtainable in Armorer villager's chests`)
  event.addItem('travelersbackpack:villager', `Obtainable by buying it from a Librarian`)
})