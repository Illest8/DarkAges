StartupEvents.modifyCreativeTab('minecraft:tools_and_utilities', event => {

    let wagons = [
        'dragnlivestock:covered_wagon',
        'dragnlivestock:lumber_wagon',
        'dragnlivestock:livestock_wagon',
        'dragnlivestock:goods_cart',
        'dragnlivestock:mining_cart',
        'dragnlivestock:transport_cart',
        'dragnlivestock:plow'
    ]

    wagons.forEach(wagon => {
        for (let i = 0; i < 10; i++) {
            event.add(Item.of(wagon, { 'type': i }))
        }
    })

    let backpacks = Ingredient.of(/travelersbackpack/).itemIds
    backpacks.forEach(backpack => {
        event.add(backpack)
    })
    event.add([
        'simplytents:tent',
        'simplytents:wall_tent',
        'simplytents:zip_tent',
        'simplytents:roof_tent',
        'tide:stone_fishing_rod',
        'tide:iron_fishing_rod',
        'tide:golden_fishing_rod',
        'tide:crystal_fishing_rod',
        'tide:diamond_fishing_rod',
        'tide:netherite_fishing_rod',
        Ingredient.of(/tide:.*_hook/),
        Ingredient.of(/tide:.*_line/),
        Ingredient.of(/tide:.*_bait/),
        'stardew_fishing:fish_display',
        'stardew_fishing:trap_bobber',
        'stardew_fishing:cork_bobber',
        'stardew_fishing:sonar_bobber',
        'stardew_fishing:quality_bobber',
        'stardew_fishing:treasure_bobber',
        'tide:climate_gauge',
        'mca:blueprint',
        'mca:villager_tracker',
        'mca:wedding_ring',
        'mca:engagement_ring',
        'mca:matchmakers_ring',
        'mca:bouquet',
        'mca:divorce_papers',
        'eclipticseasons:calendar',
        'mca:divorce_papers',
        'eclipticseasons:calendar',
        'dragnlivestock:wagon_axel',
        'dragnlivestock:wagon_body',
        'dragnlivestock:wagon_cover',
        'dragnlivestock:wagon_harness',
        'dragnlivestock:wagon_wheel',
        'dragnlivestock:wagon_wheel_frame',
        'smallships:sail',
        // 'legendarysurvivaloverhaul:tonic',
        // 'legendarysurvivaloverhaul:plaster',
        // 'legendarysurvivaloverhaul:morphine',
        // 'legendarysurvivaloverhaul:medkit',
        // 'legendarysurvivaloverhaul:healing_herbs',
        // 'legendarysurvivaloverhaul:sponge',
        // 'legendarysurvivaloverhaul:bandage',
        // 'legendarysurvivaloverhaul:thermometer',
        // 'legendarysurvivaloverhaul:heating_coat_2',
        // 'legendarysurvivaloverhaul:heating_coat_3',
        // 'legendarysurvivaloverhaul:heating_coat_1',
        // 'legendarysurvivaloverhaul:cooling_coat_3',
        // 'legendarysurvivaloverhaul:cooling_coat_2',
        // 'legendarysurvivaloverhaul:cooling_coat_1',
        // 'legendarysurvivaloverhaul:warm_string',
        // 'legendarysurvivaloverhaul:cold_string',
        // 'legendarysurvivaloverhaul:seasonal_calendar',
        // 'legendarysurvivaloverhaul:thermal_coat_3',
        // 'legendarysurvivaloverhaul:thermal_coat_2',
        // 'legendarysurvivaloverhaul:thermal_coat_1',
        'iceandfire:silver_axe',
        'iceandfire:silver_hoe',
        'iceandfire:silver_pickaxe',
        'iceandfire:silver_shovel',
        'iceandfire:dragonbone_axe',
        'iceandfire:dragonbone_hoe',
        'iceandfire:dragonbone_pickaxe',
        'iceandfire:dragonbone_shovel'
    ])
    event.remove('#minecraft:boats')
    event.remove('apotheosis:ender_lead')
    event.remove('mca:villager_tracker')
})