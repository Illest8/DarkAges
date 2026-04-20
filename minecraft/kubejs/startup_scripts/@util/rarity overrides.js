const $Rarity = Java.loadClass("net.minecraft.world.item.Rarity")
const $UnaryOperator = Java.loadClass("java.util.function.UnaryOperator")
const $UtilsJS = Java.loadClass("dev.latvian.mods.kubejs.util.UtilsJS")
const $Style = Java.loadClass("net.minecraft.network.chat.Style")
const withColorMethod = $Style.EMPTY.class.declaredMethods.filter((method) => method.name.includes("m_131148_"))[0]

function createRarity(/** @type {string} */ name, /** @type {number} */ colorCode) {
    let color = $UtilsJS.makeFunctionProxy("startup", $UnaryOperator, (style) => {
        return withColorMethod.invoke(style, Color.of(colorCode).createTextColorJS())
    })
    return $Rarity["create(java.lang.String,java.util.function.UnaryOperator)"](name, color)
}

createRarity("TWO_HAND", "#FFFFFF")

ItemEvents.modification(event => {

    let twoHandItems = [
        'epicfight:uchigatana',
        'iceandfire:dragonsteel_fire_axe',
        'iceandfire:dragonsteel_ice_axe',
        'iceandfire:dragonsteel_lightning_axe',
        'iceandfire:tide_trident',
        'irons_spellbooks:artificer_cane',
        'irons_spellbooks:hither_thither_wand',
        'irons_spellbooks:lightning_rod',
        'minecraft:trident'
    ]

    let twoHandIds = Ingredient.of(/_greatsword|_greataxe|_tachi|_staff|_ahlspiess|_claymore|_concavehalberd|_estoc|_guisarme|_heavywarhammer|_lochaberaxe|_lucernhammer|_pike|_zweihander/).itemIds;
    twoHandIds.forEach(item => {
        twoHandItems.push(item);
    })

    for (let i = 0; i < twoHandItems.length; i++) {
        event.modify(twoHandItems[i], item => {
            item.rarity = "TWO_HAND"
        })
    }
})

createRarity("ONE_HAND", "#FFFFFF")
ItemEvents.modification(event => {

    let oneHandItems = [
        'irons_spellbooks:amethyst_rapier',
        'irons_spellbooks:keeper_flamberge',
        'irons_spellbooks:magehunter',
        'irons_spellbooks:spellbreaker'
    ]

    let oneHandIds = Ingredient.of(/_sword|_spear|_longsword|_dagger|_bastardsword|_heavymace|_katzbalger|_morgenstern|_shortsword|_stylet/).itemIds;
    oneHandIds.forEach(item => {
        oneHandItems.push(item);
    })

    for (let i = 0; i < oneHandItems.length; i++) {
        event.modify(oneHandItems[i], item => {
            item.rarity = "ONE_HAND"
        })
    }
})

createRarity("SHIELD", "#FFFFFF")
ItemEvents.modification(event => {

    let shieldIds = Ingredient.of(/shield|buckler|ellipticalshield|heatershield|kiteshield|rondache|roundshield|_target/).itemIds;

    for (let i = 0; i < shieldIds.length; i++) {
        event.modify(shieldIds[i], item => {
            item.rarity = "SHIELD"
        })
    }
})

createRarity("MEDICINE", "#FFFFFF");

ItemEvents.modification(event => {
    let medicineItems = [
        'legendarysurvivaloverhaul:healing_herbs',
        'legendarysurvivaloverhaul:tonic',
        'legendarysurvivaloverhaul:plaster',
        'legendarysurvivaloverhaul:morphine',
        'legendarysurvivaloverhaul:medkit',
        'legendarysurvivaloverhaul:bandage'
    ];
    medicineItems.forEach(medicineItem => {
        event.modify(medicineItem, item => {
            item.rarity = 'MEDICINE'
        })
    })
})

createRarity("SPELL", "#FFFFFF");

ItemEvents.modification(event => {
    let scrollItems = [
        'irons_spellbooks:scroll'
    ];
    scrollItems.forEach(scroll => {
        event.modify(scroll, item => {
            item.rarity = 'SPELL'
        })
    })
})

createRarity("ENCHANTMENT", "#FFFFFF");

ItemEvents.modification(event => {
    let enchantmentItems = [
        'immersiveenchanting:ancient_book'
    ];
    enchantmentItems.forEach(enchantmentItem => {
        event.modify(enchantmentItem, item => {
            item.rarity = "ENCHANTMENT";
        })
    })
})

createRarity("HELMET", "#FFFFFF");
ItemEvents.modification(event => {

    let helmetItems = [
        'epicfight:stray_hat',
    ];
    let helmetIds = Ingredient.of(/_helmet/).itemIds
    helmetIds.forEach(helmet => {
        helmetItems.push(helmet)
    })

    for (let i = 0; i < helmetItems.length; i++) {
        event.modify(helmetItems[i], item => {
            item.rarity = "HELMET"
        })
    }
})

createRarity("CHESTPLATE", "#FFFFFF")
ItemEvents.modification(event => {

    let chestItems = [
        'epicfight:stray_robe'
    ]

    let chestplateIds = Ingredient.of(/_chestplate/).itemIds;
    chestplateIds.forEach(chestplate => {
        chestItems.push(chestplate)
    })

    for (let i = 0; i < chestItems.length; i++) {
        event.modify(chestItems[i], item => {
            item.rarity = "CHESTPLATE"
        })
    }
})

createRarity("LEGGINGS", "#FFFFFF")
ItemEvents.modification(event => {

    let legsItems = [
        'epicfight:stray_pants'
    ]

    let leggingIds = Ingredient.of(/_leggings/).itemIds;
    leggingIds.forEach(legging => {
        legsItems.push(legging);
    })

    for (let i = 0; i < legsItems.length; i++) {
        event.modify(legsItems[i], item => {
            item.rarity = "LEGGINGS"
        })
    }
})

createRarity("BOOTS", "#FFFFFF")
ItemEvents.modification(event => {

    let bootsItems = [];

    let bootIds = Ingredient.of(/_boots/).itemIds;
    bootIds.forEach(boot => {
        bootsItems.push(boot)
    })

    for (let i = 0; i < bootsItems.length; i++) {
        event.modify(bootsItems[i], item => {
            item.rarity = "BOOTS"
        })
    }
})

createRarity("RANGED", "#FFFFFF")
ItemEvents.modification(event => {

    let rangedItems = [
        'minecraft:bow',
        'minecraft:crossbow',
        'iceandfire:dragonbone_bow',
        'irons_spellbooks:autoloader_crossbow'
    ]

    for (let i = 0; i < rangedItems.length; i++) {
        event.modify(rangedItems[i], item => {
            item.rarity = "RANGED"
        })
    }
})

createRarity("OIL", "#FFFFFF")

ItemEvents.modification(event => {

    let commonItems = [
        'supplementaries:quiver',
        'apotheosis:augmenting_table',
        'epicfight:skillbook',
        'supplementaries:quiver',
        'supplementaries:bomb',
        'supplementaries:bomb_projectile'
    ]

    for (let i = 0; i < commonItems.length; i++) {
        event.modify(commonItems[i], item => {
            item.rarity = "common"
        })
    }
})

createRarity("BACKPACK", "#FFFFFF")

ItemEvents.modification(event => {
    let backpacks = Ingredient.of(/travelersbackpack/).itemIds;
    backpacks.forEach(backpack => {
        if (backpack.includes('upgrade') || backpack.includes('sleeping_bag')) return;
        event.modify(backpack, item => {
            item.rarity = 'BACKPACK';
        })
    })
})