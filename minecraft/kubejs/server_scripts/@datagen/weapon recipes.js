
// // IMPACT
// ServerEvents.highPriorityData(event => {

//     const impactFloor = {
//         ahlspiess: 0.9,
//         bastardsword: 1,
//         claymore: 1.3,
//         concavehalberd: 1.5,
//         estoc: 1.1,
//         flamebladedsword: 1.2,
//         guisarme: 0.7,
//         heavymace: 1.5,
//         heavywarhammer: 2,
//         katzbalger: 0.6,
//         lochaberaxe: 0.7,
//         lucernhammer: 0.8,
//         morgenstern: 1.4,
//         pike: 0.3,
//         ranseur: 0.5,
//         shortsword: 0.5,
//         stylet: 0.2,
//         zweihander: 1.3,
//         greatsword: 1.6,
//         dagger: 0.2,
//         tachi: 1.2,
//         longsword: 1.1,
//         spear: 0.6,
//         sword: 0.7
//     }

//     const materialValues = {
//         wood: 0.1,
//         stone: 0.2,
//         copper: 0.3,
//         iron: 0.5,
//         silver: 0.45,
//         golden: 0.4,
//         gold: 0.4,
//         steel: 0.7,
//         diamond: 0.6,
//         netherite: 0.8
//     };

//     for (const [weaponType, weaponList] of Object.entries(global.weaponRegistry)) {

//         if (!(weaponType in impactFloor)) continue;

//        let baseImpact = impactFloor[weaponType];

//         weaponList.forEach(entry => {

//            let { id, material } = entry;

//             if (!(material in materialValues)) return;

//            let bonus = materialValues[material];
//            let totalImpact = baseImpact + bonus;

//            let [namespace, name] = id.split(':');

//             const jsonContent = {
//                 attributes: {
//                     common: {
//                         armor_negation: 0,
//                         max_strikes: 4,
//                         impact: 0
//                     }
//                 },
//                 type: `darkages:${weaponType}`
//             };

//             JsonIO.write(
//                 `kubejs/data/${namespace}/capabilities/weapons/${name}.json`,
//                 jsonContent
//             );
//         });
//     }
// });

// RECIPES
ServerEvents.highPriorityData(event => {

    let registry = global.weaponRegistry;

    let materials = {
        silver: { mod: "iceandfire", ingot: "overgeared:heated_silver_ingot", nugget: "iceandfire:silver_nugget" },
        iron: { mod: "minecraft", ingot: "overgeared:heated_iron_ingot", nugget: "minecraft:iron_nugget" },
        gold: { mod: "minecraft", ingot: "minecraft:gold_ingot", nugget: "minecraft:gold_nugget", special: "golden" },
        golden: { mod: "minecraft", ingot: "minecraft:gold_ingot", nugget: "minecraft:gold_nugget", special: "golden" },
        diamond: { mod: "minecraft", ingot: "minecraft:diamond", nugget: "overgeared:diamond_shard" },
        steel: { mod: "overgeared", ingot: "overgeared:heated_steel_ingot", nugget: "overgeared:steel_nugget" },
        netherite: { mod: "minecraft", ingot: "overgeared:heated_netherite_alloy", nugget: "minecraft:netherite_scrap" },
        wood: { mod: "minecraft", ingot: "minecraft:oak_planks", nugget: "minecraft:oak_button", special: "wooden" },
        stone: { mod: "minecraft", ingot: "minecraft:cobblestone", nugget: "overgeared:knappable_rock", special: "stone" },
        copper: { mod: "overgeared", ingot: "overgeared:heated_copper_ingot", nugget: "overgeared:copper_nugget" }
    };

    let recipePatterns = {
        ahlspiess: [
            "  D",
            " H ",
            "H  "
        ],
        dagger: [
            " # ",
            "S  "
        ],
        longsword: [
            "  #",
            " # ",
            "R  "
        ],
        heavywarhammer: [
            " #N",
            "#A ",
            "H N"
        ],
        lucernhammer: [
            " NN",
            "NA ",
            "H N"
        ],
        tachi: [
            " ##",
            "R  "
        ],
        greatsword: [
            " ##",
            "###",
            "R# "
        ],
        spear: [
            "  T",
            " S ",
            "S  "
        ],
        pike: [
            "  #",
            " H ",
            "H  "
        ],
        heavymace: [
            " ##",
            " ##",
            "H  "
        ],
        estoc: [
            "  #",
            " # ",
            "T  "
        ],
        guisarme: [
            " N#",
            " S ",
            "S  "
        ],
        claymore: [
            " ##",
            " ##",
            "S  "
        ],
        morgenstern: [
            " NN",
            " #N",
            "H  "
        ],
        bastardsword: [
            "   ",
            " # ",
            "R  "
        ],
        stylet: [
            "#  ",
            "#  ",
            "S  "
        ],
        shortsword: [
            "  #",
            "  #",
            "  S"
        ],
        zweihander: [
            "  #",
            "#S ",
            "R# "
        ],
        concavehalberd: [
            " #N",
            "#S#",
            "S  "
        ],
        lochaberaxe: [
            "  A",
            " H ",
            "S  "
        ]
    };

    for (let weaponType in registry) {

        registry[weaponType].forEach(entry => {

            let weapon = entry.id;
            let mat = entry.material;

            if (!materials[mat]) return;

            let pattern = recipePatterns[weaponType];
            if (!pattern) return;

            let [namespace, name] = weapon.split(':');
            if (namespace == 'magistuarmory') {
                namespace = 'forging'
            }

            let key = {
                "#": { item: materials[mat].ingot },
                "N": { item: materials[mat].nugget },
                "S": { item: "minecraft:stick" },
                "H": { item: "magistuarmory:hilt" }
            };

            const toolName = (type) => {
                let special = materials[mat].special;
                return special ? `${special}_${type}` : `${mat}_${type}`;
            };

            if (pattern.some(row => row.includes("A"))) {
                let mod = materials[mat].mod;
                key["A"] = { item: `${mod}:${toolName("axe")}` };
            }

            if (pattern.some(row => row.includes("R"))) {
                let mod = materials[mat].mod;
                key["R"] = { item: `${mod}:${toolName("sword")}` };
            }

            if (pattern.some(row => row.includes("T"))) {
                key["T"] = { item: `magistuarmory:${mat}_stylet` };
            }

            if (pattern.some(row => row.includes("D"))) {
                key["D"] = { item: `magistuarmory:${mat}_shortsword` };
            }

            let count = pattern.reduce((sum, row) => sum + (row.split(' ').length - 1), 0);
            count = Math.max(9 - count, 3);

            const jsonContent = {
                type: "overgeared:forging",
                category: "misc",
                hammering: count,
                has_polishing: false,
                has_quality: true,
                key: key,
                minimum_quality: "poor",
                needs_minigame: false,
                pattern: pattern,
                requires_blueprint: false,
                result: { item: weapon },
                show_notification: true,
                tier: "stone"
            };

            JsonIO.write(
                `kubejs/data/${namespace}/recipes/${name}.json`,
                jsonContent
            );
        });
    }
});

// ServerEvents.highPriorityData(event => {

//     // Default values used for all recipes
//     const defaults = {
//         amount: 1000,
//         baseFluid: irons_spellbooks:rare_ink,
//         inputType: tag,
//         input: forge:ingots/gold,
//         outputAmount: 250
//     }

//     // Recipes only specify what changes
//     const alchemistRecipes = {
//         irons_spellbooks:epic_ink: {
//             outputFluid: irons_spellbooks:epic_ink
//         },

//         irons_spellbooks:legendary_ink: {
//             baseFluid: irons_spellbooks:epic_ink,
//             inputType: item,
//             input: minecraft:nether_star,
//             outputAmount: 500,
//             outputFluid: irons_spellbooks:legendary_ink
//         }
//     }

//     Object.entries(alchemistRecipes).forEach(([name, recipe]) => {

//         // Merge defaults with recipe-specific overrides
//         const r = { ...defaults, ...recipe }

//         const jsonContent = {
//             type: irons_spellbooks:alchemist_cauldron_brew,
//             base_fluid: {
//                 Amount: r.amount,
//                 FluidName: r.baseFluid
//             },
//             input: r.inputType === tag
//                 ? { tag: r.input }
//                 : { item: r.input },
//             results: [
//                 {
//                     Amount: r.outputAmount,
//                     FluidName: r.outputFluid
//                 }
//             ]
//         }

//         JsonIO.write(
//             `kubejs/data/test/cauldron_recipes/${name.replace(':', '_')}.json`,
//             jsonContent
//         )
//     })
// })

// ServerEvents.highPriorityData(event => {

//     let oilTag = []
//     let fluidTag = []
//     global.oils.forEach(oil => {

//         const brewContent = {
//             type: `irons_spellbooks:alchemist_cauldron_brew`,
//             base_fluid: {
//                 Amount: 250,
//                 FluidName: oil.baseFluid
//             },
//             input: {
//                 item: oil.ingredient
//             },
//             results: [
//                 {
//                     Amount: 250,
//                     FluidName: `darkages:${oil.name}_fluid`
//                 }
//             ]
//         }

//         const emptyContent = {
//             type: `irons_spellbooks:alchemist_cauldron_empty`,
//             fluid: {
//                 Amount: 250,
//                 FluidName: `darkages:${oil.name}_fluid`
//             },
//             input: {
//                 item: `minecraft:glass_bottle`
//             },
//             result: {
//                 count: 1,
//                 item: `darkages:${oil.name}_vial`
//             }
//         }

//         const fillContent = {
//             type: `irons_spellbooks:alchemist_cauldron_fill`,
//             fluid: {
//                 Amount: 250,
//                 FluidName: `darkages:${oil.name}_fluid`
//             },
//             input: {
//                 item: `darkages:${oil.name}_vial`
//             },
//             result: {
//                 count: 1,
//                 item: `minecraft:glass_bottle`
//             }
//         }

//         JsonIO.write(
//             `kubejs/data/darkages/recipes/alchemist_cauldron/brew_${oil.name}.json`,
//             brewContent
//         );

//         JsonIO.write(
//             `kubejs/data/darkages/recipes/alchemist_cauldron/empty_${oil.name}_vial.json`,
//             emptyContent
//         );

//         JsonIO.write(
//             `kubejs/data/darkages/recipes/alchemist_cauldron/fill_${oil.name}_vial.json`,
//             fillContent
//         );

//         oilTag.push(`darkages:${oil.name}_vial`)
//         fluidTag.push(`darkages:${oil.name}_fluid`)
//     })

//     let fluidContent = {
//         replace: false,
//         values: fluidTag
//     }

//     let oilContent = {
//         replace: false,
//         values: oilTag
//     }

//     JsonIO.write(
//         `kubejs/data/darkages/tags/items/oils.json`,
//         fluidContent
//     )

//     JsonIO.write(
//         `kubejs/data/darkages/tags/items/oil_vials.json`,
//         oilContent
//     )
// })