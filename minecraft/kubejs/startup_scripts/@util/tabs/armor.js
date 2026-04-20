StartupEvents.modifyCreativeTab('minecraft:spawn_eggs', event => {
    event.setDisplayName(Text.of('Armors').gold());
    event.setIcon('fantasy_armor:old_knight_chestplate');
    let itemsToAdd = [

        'minecraft:leather_helmet',
        'minecraft:leather_chestplate',
        'minecraft:leather_leggings',
        'minecraft:leather_boots',

        'overgeared:copper_helmet',
        'overgeared:copper_chestplate',
        'overgeared:copper_leggings',
        'overgeared:copper_boots',

        'minecraft:chainmail_helmet',
        'minecraft:chainmail_chestplate',
        'minecraft:chainmail_leggings',
        'minecraft:chainmail_boots',

        'minecraft:golden_helmet',
        'minecraft:golden_chestplate',
        'minecraft:golden_leggings',
        'minecraft:golden_boots',

        'iceandfire:armor_silver_metal_helmet',
        'iceandfire:armor_silver_metal_chestplate',
        'iceandfire:armor_silver_metal_leggings',
        'iceandfire:armor_silver_metal_boots',

        'minecraft:iron_helmet',
        'minecraft:iron_chestplate',
        'minecraft:iron_leggings',
        'minecraft:iron_boots',

        'overgeared:steel_helmet',
        'overgeared:steel_chestplate',
        'overgeared:steel_leggings',
        'overgeared:steel_boots',

        'minecraft:diamond_helmet',
        'minecraft:diamond_chestplate',
        'minecraft:diamond_leggings',
        'minecraft:diamond_boots',

        'minecraft:netherite_helmet',
        'minecraft:netherite_chestplate',
        'minecraft:netherite_leggings',
        'minecraft:netherite_boots',

        'fantasy_armor:chess_board_knight_helmet',
        'fantasy_armor:chess_board_knight_chestplate',
        'fantasy_armor:chess_board_knight_leggings',
        'fantasy_armor:chess_board_knight_boots',

        'fantasy_armor:crucible_knight_helmet',
        'fantasy_armor:crucible_knight_chestplate',
        'fantasy_armor:crucible_knight_leggings',
        'fantasy_armor:crucible_knight_boots',

        'fantasy_armor:dark_cover_helmet',
        'fantasy_armor:dark_cover_chestplate',
        'fantasy_armor:dark_cover_leggings',
        'fantasy_armor:dark_cover_boots',

        'fantasy_armor:dark_lord_helmet',
        'fantasy_armor:dark_lord_chestplate',
        'fantasy_armor:dark_lord_leggings',
        'fantasy_armor:dark_lord_boots',

        'fantasy_armor:dead_gladiator_helmet',
        'fantasy_armor:dead_gladiator_chestplate',
        'fantasy_armor:dead_gladiator_leggings',
        'fantasy_armor:dead_gladiator_boots',

        'fantasy_armor:dragonslayer_helmet',
        'fantasy_armor:dragonslayer_chestplate',
        'fantasy_armor:dragonslayer_leggings',
        'fantasy_armor:dragonslayer_boots',

        'fantasy_armor:eclipse_soldier_helmet',
        'fantasy_armor:eclipse_soldier_chestplate',
        'fantasy_armor:eclipse_soldier_leggings',
        'fantasy_armor:eclipse_soldier_boots',

        'fantasy_armor:evening_ghost_helmet',
        'fantasy_armor:evening_ghost_chestplate',
        'fantasy_armor:evening_ghost_leggings',
        'fantasy_armor:evening_ghost_boots',

        'fantasy_armor:flesh_of_the_feaster_helmet',
        'fantasy_armor:flesh_of_the_feaster_chestplate',
        'fantasy_armor:flesh_of_the_feaster_leggings',
        'fantasy_armor:flesh_of_the_feaster_boots',

        'fantasy_armor:fog_guard_helmet',
        'fantasy_armor:fog_guard_chestplate',
        'fantasy_armor:fog_guard_leggings',
        'fantasy_armor:fog_guard_boots',

        'fantasy_armor:forgotten_trace_helmet',
        'fantasy_armor:forgotten_trace_chestplate',
        'fantasy_armor:forgotten_trace_leggings',
        'fantasy_armor:forgotten_trace_boots',

        'fantasy_armor:gilded_hunt_helmet',
        'fantasy_armor:gilded_hunt_chestplate',
        'fantasy_armor:gilded_hunt_leggings',
        'fantasy_armor:gilded_hunt_boots',

        'fantasy_armor:golden_execution_helmet',
        'fantasy_armor:golden_execution_chestplate',
        'fantasy_armor:golden_execution_leggings',
        'fantasy_armor:golden_execution_boots',

        'fantasy_armor:golden_horns_helmet',
        'fantasy_armor:golden_horns_chestplate',
        'fantasy_armor:golden_horns_leggings',
        'fantasy_armor:golden_horns_boots',

        'fantasy_armor:grave_sentinel_helmet',
        'fantasy_armor:grave_sentinel_chestplate',
        'fantasy_armor:grave_sentinel_leggings',
        'fantasy_armor:grave_sentinel_boots',

        'fantasy_armor:hero_helmet',
        'fantasy_armor:hero_chestplate',
        'fantasy_armor:hero_leggings',
        'fantasy_armor:hero_boots',

        'fantasy_armor:lady_maria_helmet',
        'fantasy_armor:lady_maria_chestplate',
        'fantasy_armor:lady_maria_leggings',
        'fantasy_armor:lady_maria_boots',

        'fantasy_armor:malenia_helmet',
        'fantasy_armor:malenia_chestplate',
        'fantasy_armor:malenia_leggings',
        'fantasy_armor:malenia_boots',

        'fantasy_armor:old_knight_helmet',
        'fantasy_armor:old_knight_chestplate',
        'fantasy_armor:old_knight_leggings',
        'fantasy_armor:old_knight_boots',

        'fantasy_armor:redeemer_helmet',
        'fantasy_armor:redeemer_chestplate',
        'fantasy_armor:redeemer_leggings',
        'fantasy_armor:redeemer_boots',

        'fantasy_armor:ronin_helmet',
        'fantasy_armor:ronin_chestplate',
        'fantasy_armor:ronin_leggings',
        'fantasy_armor:ronin_boots',

        'fantasy_armor:silver_knight_helmet',
        'fantasy_armor:silver_knight_chestplate',
        'fantasy_armor:silver_knight_leggings',
        'fantasy_armor:silver_knight_boots',

        'fantasy_armor:spark_of_dawn_helmet',
        'fantasy_armor:spark_of_dawn_chestplate',
        'fantasy_armor:spark_of_dawn_leggings',
        'fantasy_armor:spark_of_dawn_boots',

        'fantasy_armor:sunset_wings_helmet',
        'fantasy_armor:sunset_wings_chestplate',
        'fantasy_armor:sunset_wings_leggings',
        'fantasy_armor:sunset_wings_boots',

        'fantasy_armor:thief_helmet',
        'fantasy_armor:thief_chestplate',
        'fantasy_armor:thief_leggings',
        'fantasy_armor:thief_boots',

        'fantasy_armor:twinned_helmet',
        'fantasy_armor:twinned_chestplate',
        'fantasy_armor:twinned_leggings',
        'fantasy_armor:twinned_boots',

        'fantasy_armor:wandering_wizard_helmet',
        'fantasy_armor:wandering_wizard_chestplate',
        'fantasy_armor:wandering_wizard_leggings',
        'fantasy_armor:wandering_wizard_boots',

        'fantasy_armor:wind_worshipper_helmet',
        'fantasy_armor:wind_worshipper_chestplate',
        'fantasy_armor:wind_worshipper_leggings',
        'fantasy_armor:wind_worshipper_boots',

        'iceandfire:armor_amythest_helmet',
        'iceandfire:armor_amythest_chestplate',
        'iceandfire:armor_amythest_leggings',
        'iceandfire:armor_amythest_boots',

        'iceandfire:armor_black_helmet',
        'iceandfire:armor_black_chestplate',
        'iceandfire:armor_black_leggings',
        'iceandfire:armor_black_boots',

        'iceandfire:armor_blue_helmet',
        'iceandfire:armor_blue_chestplate',
        'iceandfire:armor_blue_leggings',
        'iceandfire:armor_blue_boots',

        'iceandfire:armor_bronze_helmet',
        'iceandfire:armor_bronze_chestplate',
        'iceandfire:armor_bronze_leggings',
        'iceandfire:armor_bronze_boots',

        'iceandfire:armor_copper_helmet',
        'iceandfire:armor_copper_chestplate',
        'iceandfire:armor_copper_leggings',
        'iceandfire:armor_copper_boots',

        'iceandfire:armor_electric_helmet',
        'iceandfire:armor_electric_chestplate',
        'iceandfire:armor_electric_leggings',
        'iceandfire:armor_electric_boots',

        'iceandfire:armor_gray_helmet',
        'iceandfire:armor_gray_chestplate',
        'iceandfire:armor_gray_leggings',
        'iceandfire:armor_gray_boots',

        'iceandfire:armor_green_helmet',
        'iceandfire:armor_green_chestplate',
        'iceandfire:armor_green_leggings',
        'iceandfire:armor_green_boots',

        'iceandfire:armor_red_helmet',
        'iceandfire:armor_red_chestplate',
        'iceandfire:armor_red_leggings',
        'iceandfire:armor_red_boots',

        'iceandfire:armor_sapphire_helmet',
        'iceandfire:armor_sapphire_chestplate',
        'iceandfire:armor_sapphire_leggings',
        'iceandfire:armor_sapphire_boots',

        'iceandfire:armor_silver_helmet',
        'iceandfire:armor_silver_chestplate',
        'iceandfire:armor_silver_leggings',
        'iceandfire:armor_silver_boots',

        'iceandfire:armor_white_helmet',
        'iceandfire:armor_white_chestplate',
        'iceandfire:armor_white_leggings',
        'iceandfire:armor_white_boots',

        'iceandfire:deathworm_red_helmet',
        'iceandfire:deathworm_red_chestplate',
        'iceandfire:deathworm_red_leggings',
        'iceandfire:deathworm_red_boots',

        'iceandfire:deathworm_white_helmet',
        'iceandfire:deathworm_white_chestplate',
        'iceandfire:deathworm_white_leggings',
        'iceandfire:deathworm_white_boots',

        'iceandfire:deathworm_yellow_helmet',
        'iceandfire:deathworm_yellow_chestplate',
        'iceandfire:deathworm_yellow_leggings',
        'iceandfire:deathworm_yellow_boots',

        'iceandfire:dragonsteel_fire_helmet',
        'iceandfire:dragonsteel_fire_chestplate',
        'iceandfire:dragonsteel_fire_leggings',
        'iceandfire:dragonsteel_fire_boots',

        'iceandfire:dragonsteel_ice_helmet',
        'iceandfire:dragonsteel_ice_chestplate',
        'iceandfire:dragonsteel_ice_leggings',
        'iceandfire:dragonsteel_ice_boots',

        'iceandfire:dragonsteel_lightning_helmet',
        'iceandfire:dragonsteel_lightning_chestplate',
        'iceandfire:dragonsteel_lightning_leggings',
        'iceandfire:dragonsteel_lightning_boots',

        'iceandfire:forest_troll_leather_helmet',
        'iceandfire:forest_troll_leather_chestplate',
        'iceandfire:forest_troll_leather_leggings',
        'iceandfire:forest_troll_leather_boots',

        'iceandfire:frost_troll_leather_helmet',
        'iceandfire:frost_troll_leather_chestplate',
        'iceandfire:frost_troll_leather_leggings',
        'iceandfire:frost_troll_leather_boots',

        'iceandfire:mountain_troll_leather_helmet',
        'iceandfire:mountain_troll_leather_chestplate',
        'iceandfire:mountain_troll_leather_leggings',
        'iceandfire:mountain_troll_leather_boots',

        'iceandfire:myrmex_desert_helmet',
        'iceandfire:myrmex_desert_chestplate',
        'iceandfire:myrmex_desert_leggings',
        'iceandfire:myrmex_desert_boots',

        'iceandfire:myrmex_jungle_helmet',
        'iceandfire:myrmex_jungle_chestplate',
        'iceandfire:myrmex_jungle_leggings',
        'iceandfire:myrmex_jungle_boots',

        'iceandfire:sheep_helmet',
        'iceandfire:sheep_chestplate',
        'iceandfire:sheep_leggings',
        'iceandfire:sheep_boots',

        'iceandfire:tide_blue_helmet',
        'iceandfire:tide_blue_chestplate',
        'iceandfire:tide_blue_leggings',
        'iceandfire:tide_blue_boots',

        'iceandfire:tide_bronze_helmet',
        'iceandfire:tide_bronze_chestplate',
        'iceandfire:tide_bronze_leggings',
        'iceandfire:tide_bronze_boots',

        'iceandfire:tide_deepblue_helmet',
        'iceandfire:tide_deepblue_chestplate',
        'iceandfire:tide_deepblue_leggings',
        'iceandfire:tide_deepblue_boots',

        'iceandfire:tide_green_helmet',
        'iceandfire:tide_green_chestplate',
        'iceandfire:tide_green_leggings',
        'iceandfire:tide_green_boots',

        'iceandfire:tide_purple_helmet',
        'iceandfire:tide_purple_chestplate',
        'iceandfire:tide_purple_leggings',
        'iceandfire:tide_purple_boots',

        'iceandfire:tide_red_helmet',
        'iceandfire:tide_red_chestplate',
        'iceandfire:tide_red_leggings',
        'iceandfire:tide_red_boots',

        'iceandfire:tide_teal_helmet',
        'iceandfire:tide_teal_chestplate',
        'iceandfire:tide_teal_leggings',
        'iceandfire:tide_teal_boots',

        'irons_spellbooks:archevoker_helmet',
        'irons_spellbooks:archevoker_chestplate',
        'irons_spellbooks:archevoker_leggings',
        'irons_spellbooks:archevoker_boots',

        'irons_spellbooks:cryomancer_helmet',
        'irons_spellbooks:cryomancer_chestplate',
        'irons_spellbooks:cryomancer_leggings',
        'irons_spellbooks:cryomancer_boots',

        'irons_spellbooks:cultist_helmet',
        'irons_spellbooks:cultist_chestplate',
        'irons_spellbooks:cultist_leggings',
        'irons_spellbooks:cultist_boots',

        'irons_spellbooks:electromancer_helmet',
        'irons_spellbooks:electromancer_chestplate',
        'irons_spellbooks:electromancer_leggings',
        'irons_spellbooks:electromancer_boots',

        'irons_spellbooks:netherite_mage_helmet',
        'irons_spellbooks:netherite_mage_chestplate',
        'irons_spellbooks:netherite_mage_leggings',
        'irons_spellbooks:netherite_mage_boots',

        'irons_spellbooks:plagued_helmet',
        'irons_spellbooks:plagued_chestplate',
        'irons_spellbooks:plagued_leggings',
        'irons_spellbooks:plagued_boots',

        'irons_spellbooks:priest_helmet',
        'irons_spellbooks:priest_chestplate',
        'irons_spellbooks:priest_leggings',
        'irons_spellbooks:priest_boots',

        'irons_spellbooks:pumpkin_helmet',
        'irons_spellbooks:pumpkin_chestplate',
        'irons_spellbooks:pumpkin_leggings',
        'irons_spellbooks:pumpkin_boots',

        'irons_spellbooks:pyromancer_helmet',
        'irons_spellbooks:pyromancer_chestplate',
        'irons_spellbooks:pyromancer_leggings',
        'irons_spellbooks:pyromancer_boots',

        'irons_spellbooks:shadowwalker_helmet',
        'irons_spellbooks:shadowwalker_chestplate',
        'irons_spellbooks:shadowwalker_leggings',
        'irons_spellbooks:shadowwalker_boots',

        'irons_spellbooks:wandering_magician_helmet',
        'irons_spellbooks:wandering_magician_chestplate',
        'irons_spellbooks:wandering_magician_leggings',
        'irons_spellbooks:wandering_magician_boots',

        'irons_spellbooks:wizard_hat',
        'irons_spellbooks:wizard_chestplate',
        'irons_spellbooks:wizard_leggings',
        'irons_spellbooks:wizard_boots',

        'legendarysurvivaloverhaul:snow_helmet',
        'legendarysurvivaloverhaul:snow_chestplate',
        'legendarysurvivaloverhaul:snow_leggings',
        'legendarysurvivaloverhaul:snow_boots',

        'legendarysurvivaloverhaul:desert_helmet',
        'legendarysurvivaloverhaul:desert_chestplate',
        'legendarysurvivaloverhaul:desert_leggings',
        'legendarysurvivaloverhaul:desert_boots',

        'darkages:orcish_helmet',
        'darkages:orcish_chestplate',
        'darkages:orcish_leggings',
        'darkages:orcish_boots',

        'magistuarmoryaddon:dark_crusader_helmet',
        'magistuarmoryaddon:dark_crusader_chestplate',
        'magistuarmoryaddon:dark_crusader_leggings',
        'magistuarmoryaddon:dark_crusader_boots',

        'magistuarmoryaddon:dark_gothic_helmet',
        'magistuarmoryaddon:dark_gothic_chestplate',
        'magistuarmoryaddon:dark_gothic_leggings',
        'magistuarmoryaddon:dark_gothic_boots',

        'magistuarmoryaddon:dark_knight_helmet',
        'magistuarmoryaddon:dark_knight_chestplate',
        'magistuarmoryaddon:dark_knight_leggings',
        'magistuarmoryaddon:dark_knight_boots',

        'magistuarmory:greathelm',
        'magistuarmory:crusader_chestplate',
        'magistuarmory:crusader_leggings',
        'magistuarmory:crusader_boots',

        'darkagesarmory:wollaston_helmet',
        'darkagesarmory:verden_helmet',
        'magistuarmory:platemail_chestplate',
        'magistuarmory:platemail_leggings',
        'magistuarmory:platemail_boots',

        'magistuarmoryaddon:gilded_sugarloaf_helmet',
        'magistuarmoryaddon:gilded_half_armor',
        'magistuarmoryaddon:gilded_chainmail_leggings',
        'magistuarmory:chainmail_boots',

        'magistuarmory:maximilian_helmet',
        'magistuarmoryaddon:late_greathelm',
        'magistuarmoryaddon:two_eye_slits_sallet',
        'magistuarmoryaddon:early_greathelm',
        'magistuarmoryaddon:xiii_century_knight_chestplate',
        'magistuarmoryaddon:xiii_century_knight_leggings',
        'magistuarmoryaddon:xiii_century_knight_boots',

        'irons_spellbooks:tarnished_helmet'
    ]


    let safeItems = itemsToAdd.filter(id => Item.exists(id))

    itemsToAdd.forEach(id => {
        if (!Item.exists(id)) {
            console.log(`Missing item: ${id}`)
        }
    })
    event.add(safeItems);

    let spawnEggs = Ingredient.of(/spawn_egg/).itemIds;
    spawnEggs.forEach(egg => {
        event.remove(egg);
    });

    event.remove([
        'minecraft:spawner'
    ]);
})