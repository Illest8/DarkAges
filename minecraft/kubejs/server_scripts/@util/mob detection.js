let ignoreFov = [
    'darkages:bladesworn',
    "darkages:guard",
    "darkages:monk",
    "darkages:orc",
    "darkages:steelwarden",
    "darkages:thief",
    "darkages:veilkeeper",
    "darkages:viking",
    "darkages:knight",
    "dragnlivestock:o_cow",
    "dragnlivestock:o_goat",
    "dragnlivestock:o_sheep",
    "dragnpets:border_collie",
    "dragnpets:doberman",
    "dragnpets:husky",
    "dragnpets:labrador",
    "dragnpets:o_wolf",
    "dragnpets:pyrenees",
    "iceandfire:cyclops",
    "iceandfire:deathworm",
    "iceandfire:fire_dragon",
    "iceandfire:gorgon",
    "iceandfire:troll",
    "irons_spellbooks:apothecarist",
    "irons_spellbooks:archevoker",
    "irons_spellbooks:summoned_skeleton",
    "irons_spellbooks:summoned_zombie",
    "minecraft:pillager",
    "minecraft:phantom"
]

let ignoreInvis = [
    "darkages:veilkeeper",
    "darkages:steelwarden",
    "darkages:orc",
    "darkages:knight",
    "minecraft:zombie",
    "minecraft:skeleton"
]

let ignoreLight = [
    "darkages:veilkeeper",
    "darkages:steelwarden",
    "darkages:orc",
    "minecraft:zombie",
    "minecraft:skeleton",
    "irons_spellbooks:necromancer",
    "irons_spellbooks:citadel_keeper",
    "darkages:guard",
    "iceandfire:gorgon",
    "dragnpets:o_wolf",
    "dragnpets:border_collie",
    "dragnpets:doberman",
    "dragnpets:husky",
    "dragnpets:labrador",
    "dragnpets:pyrenees",
    "iceandfire:fire_dragon",
    "iceandfire:cyclops",
    "darkages:shroud",
    'iceandfire:dread_beast',
    "iceandfire:troll",
    "minecraft:phantom"
]

let ignoreLos = [
    "darkages:veilkeeper",
    "darkages:steelwarden",
    "darkages:guard",
    "iceandfire:deathworm",
    "dragnpets:o_wolf",
    "irons_spellbooks:citadel_keeper",
    "darkages:shroud",
    'iceandfire:dread_beast',
    "minecraft:phantom"
]

let ignoreSound = [
    "darkages:piglin_banker",
    "minecraft:skeleton",
    "irons_spellbooks:necromancer",
    "darkages:blacksmith",
    "darkages:friar",
    "darkages:merchant",
    "darkages:noble",
    "darkages:priestess",
    "darkages:templar",
    "darkages:wise_man",
    "darkages:woman",
    "iceandfire:cyclops",
    "mca:female_villager",
    "mca:male_villager",
    "minecraft:wandering_trader"
]

let bumbling_fool = [
    "mca:female_villager",
    "mca:male_villager",
    "minecraft:wandering_trader"
]

let never_look = [
    "mca:female_villager",
    "mca:male_villager",
    "minecraft:wandering_trader"
]

let skipSearch = [
    "darkages:guard",
    "darkages:steelwarden",
    "darkages:thief",
    "darkages:veilkeeper",
    "dragnpets:border_collie",
    "dragnpets:doberman",
    "dragnpets:husky",
    "dragnpets:labrador",
    "dragnpets:o_wolf",
    "dragnpets:pyrenees",
    "iceandfire:cyclops",
    "iceandfire:deathworm",
    "iceandfire:fire_dragon",
    "irons_spellbooks:summoned_skeleton",
    "irons_spellbooks:summoned_zombie",
    "minecraft:phantom"
]

ServerEvents.tags('entity_type', event => {
    for (let i = 0; i < ignoreFov.length; i++) {
        event.add('cloakanddagger:ignore_fov', ignoreFov)
    }
    for (let i = 0; i < skipSearch.length; i++) {
        event.add('cloakanddagger:skip_search', skipSearch)
    }
    for (let i = 0; i < ignoreLight.length; i++) {
        event.add('cloakanddagger:ignore_light', ignoreLight)
    }
    for (let i = 0; i < ignoreLos.length; i++) {
        event.add('cloakanddagger:ignore_los', ignoreLos)
    }
    for (let i = 0; i < ignoreInvis.length; i++) {
        event.add('cloakanddagger:ignore_invis', ignoreInvis)
    }
    for (let i = 0; i < ignoreSound.length; i++) {
        event.add('cloakanddagger:ignore_sound', ignoreSound)
    }
})