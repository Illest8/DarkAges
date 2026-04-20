
StartupEvents.modifyCreativeTab('minecraft:building_blocks', event => {
    let roofs = Ingredient.of('@mcwroofs').itemIds;
    roofs.forEach(roof => {
        event.addBefore('minecraft:bamboo_block', roof);
    })
})

StartupEvents.modifyCreativeTab('minecraft:natural_blocks', event => {
    event.setIcon('oak_sapling');
    event.add([
        'iceandfire:silver_ore',
        'iceandfire:deepslate_silver_ore',
        'legendarysurvivaloverhaul:ice_fern_leaf',
        'legendarysurvivaloverhaul:sun_fern_leaf',
        'legendarysurvivaloverhaul:ice_fern_gold_leaf',
        'legendarysurvivaloverhaul:sun_fern_gold_leaf',
        'legendarysurvivaloverhaul:ice_fern_seeds',
        'legendarysurvivaloverhaul:sun_fern_seeds'
    ])
})

StartupEvents.modifyCreativeTab('minecraft:colored_blocks', event => {
    coloredBlocks.forEach(block => {
        event.remove(block)
    })
    event.setIcon('another_furniture:black_sofa')
    let another_furniture = Ingredient.of(/another_furniture:/).itemIds.toArray()
    another_furniture = another_furniture.sort((a, b) => {
        const getDescriptor = id => {
            const name = id.split(':')[1]
            const parts = name.split('_')
            parts.pop()
            return parts.join('_')
        }
        return getDescriptor(a).localeCompare(getDescriptor(b))
    })
    another_furniture.forEach(item => {
        if (item.includes('lamp')) return;
        event.add(item);
    })
    let candleSticks = Ingredient.of(/supplementaries:candle_holder/).itemIds;
    candleSticks.forEach(candleStick => {
        event.add(candleStick)
    })
    event.add(coloredBlocks)
    event.add('irons_spellbooks:book_stack');
    let quark = Ingredient.of(/quark:.*/).itemIds;
    quark.forEach(item => {
        if (item.includes('glass') || item.includes('slab') || item.includes('stairs')) return;
        event.remove(item);
    })
})

StartupEvents.modifyCreativeTab('minecraft:functional_blocks', event => {
    event.setIcon('crafting_table')
    let shulkerBoxes = Ingredient.of(/shulker_box/).itemIds;
    shulkerBoxes.forEach(box => {
        event.remove(box)
    })
    event.remove([
        "quark:rope",
        'irons_spellbooks:scroll_forge',
        'irons_spellbooks:arcane_anvil',
        'bountiful:decree'
    ])
    event.addBefore('irons_spellbooks:inscription_table', [
        'irons_spellbooks:brazier',
        'summoningrituals:altar',
        'apotheosis:simple_reforging_table',
        'apotheosis:reforging_table',
        'apotheosis:salvaging_table',
        'legendarysurvivaloverhaul:heater',
        'legendarysurvivaloverhaul:sewing_table',
        'legendarysurvivaloverhaul:cooler',
        'overgeared:smithing_anvil',
        'tide:angling_table',
        'farmersdelight:stove',
        'farmersdelight:cooking_pot',
        'farmersdelight:skillet',
        'farmersdelight:cutting_board'
    ])
})

StartupEvents.modifyCreativeTab('iceandfire:items', event => {
    event.remove(
        [
            'iceandfire:armor_copper_metal_helmet',
            'iceandfire:armor_copper_metal_chestplate',
            'iceandfire:armor_copper_metal_leggings',
            'iceandfire:armor_copper_metal_boots',
            'iceandfire:copper_sword',
            'iceandfire:copper_shovel',
            'iceandfire:copper_pickaxe',
            'iceandfire:copper_axe',
            'iceandfire:copper_hoe'
        ]
    )
})

StartupEvents.modifyCreativeTab('dragnlivestock:overhauled_livestock', event => {
    event.remove([
        'dragnlivestock:utility_knife'
    ])
})

StartupEvents.modifyCreativeTab('minecraft:op_blocks', event => {
    let ftbquestItems = Ingredient.of(/ftbquests:/).itemIds
    ftbquestItems.forEach(item => {
        event.add(item)
    })
    let copycatItems = Ingredient.of(/copycats:/).itemIds
    copycatItems.forEach(item => {
        event.add(item)
    })
})

setTabName('minecraft:colored_blocks', 'Decoration')
setTabName('minecraft:combat', 'Combat')
setTabName('mcwroofs:mcwroofs', 'Roofs')
setTabName('irons_spellbooks:spellbook_scrolls', 'Scrolls')
setTabName('minecraft:natural_blocks', 'Nature')
setTabName('minecraft:building_blocks', 'Blocks')

function setTabName(tab, newName) {
    return StartupEvents.modifyCreativeTab(tab, event => {
        event.setDisplayName(Text.gold(newName))
    })
}