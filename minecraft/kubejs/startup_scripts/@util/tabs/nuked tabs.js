const REMOVED_TABS = [
    'another_furniture:another_furniture',
    'apotheosis:adventure',
    'cdmoveset:corrupt_fight',
    'copycats:functional',
    'copycats:main',
    'dragnlivestock:overhauled_livestock',
    'dragnlivestock:overhauled_pets',
    'dragnlivestock:overhauled_livestock_food',
    'eclipticseasons:eclipticseasons',
    'epicfight_dd:epicfight_dd_tab',
    'fantasy_armor:fa_tab',
    'farmersdelight:farmersdelight',
    'ftbquests:default',
    'gateways:tab',
    'irons_spellbooks:spellbook_equipment',
    'irons_spellbooks:spellbook_blocks',
    'kubejs:tab',
    'legendarysurvivaloverhaul:legendary_creatures',
    'lootr:lootr',
    'magistuarmory:particular_weapons',
    'magistuarmory:rusted',
    'magistuarmory:shields',
    'magistuarmory:weapons',
    'mca:mca_tab',
    'mcwroofs:mcwroofs',
    'tide:tide',
    'overgeared:blueprint_tab',
    'overgeared:lingering_arrows_tab',
    'overgeared:overgeared_tab',
    'stardew_fishing:items',
    'simplytents:simplytents_tab',
    'summoningrituals:tab',
    'travelersbackpack:travelersbackpack',
    'wom:items'
]

REMOVED_TABS.forEach(tab => {
    StartupEvents.modifyCreativeTab(tab, event => {
        let namespace = tab.split(':')[0]
        if (isModLoaded(namespace)) {
            event.remove(Ingredient.all)
            event.removeDisplay(Ingredient.all)
        }
    })
})