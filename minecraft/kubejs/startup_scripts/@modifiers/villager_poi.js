const $PoiType = Java.loadClass('net.minecraft.world.entity.ai.village.poi.PoiType')

if (isModLoaded('irons_spellbooks')) {
    StartupEvents.registry('minecraft:point_of_interest_type', event => {
        event.createCustom('minecraft:cleric', () => new $PoiType([Block.getBlock('irons_spellbooks:alchemist_cauldron').defaultBlockState()], 1, 1))
    })
}

if (isModLoaded('tide')) {
    StartupEvents.registry('minecraft:point_of_interest_type', event => {
        event.createCustom('minecraft:fisherman', () => new $PoiType([Block.getBlock('tide:angling_table').defaultBlockState()], 1, 1))
    })
}

if (isModLoaded('apotheosis')) {
    StartupEvents.registry('minecraft:point_of_interest_type', event => {
        event.createCustom('minecraft:toolsmith', () => new $PoiType([Block.getBlock('apotheosis:salvaging_table').defaultBlockState()], 1, 1))
    })
}

if (isModLoaded('legendarysurvivaloverhaul')) {
    StartupEvents.registry('minecraft:point_of_interest_type', event => {
        event.createCustom('minecraft:shepherd', () => new $PoiType([Block.getBlock('legendarysurvivaloverhaul:sewing_table').defaultBlockState()], 1, 1))
    })
}