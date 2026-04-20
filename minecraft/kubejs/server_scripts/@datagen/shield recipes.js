//update
ServerEvents.highPriorityData(event => {

    let registry = global.shieldRegistry;

    let materials = {
        silver: { mod: "iceandfire", ingot: "overgeared:heated_silver_ingot" },
        iron: { mod: "minecraft", ingot: "overgeared:heated_iron_ingot" },
        gold: { mod: "minecraft", ingot: "minecraft:gold_ingot" },
        diamond: { mod: "minecraft", ingot: "minecraft:diamond" },
        steel: { mod: "overgeared", ingot: "overgeared:heated_steel_ingot" },
        netherite: { mod: "minecraft", ingot: "overgeared:heated_netherite_alloy" },
        wood: { mod: "minecraft", ingot: "minecraft:oak_planks" },
        stone: { mod: "minecraft", ingot: "minecraft:cobblestone" },
        copper: { mod: "overgeared", ingot: "overgeared:heated_copper_ingot" }
    };

    let recipePatterns = {
        buckler: [
            " # ",
            "#S#",
            " # "
        ],
        ellipticalshield: [
            " # ",
            "#S#",
            " # "
        ],
        kiteshield: [
            "###",
            "#S#",
            " # "
        ],
        heatershield: [
            "# #",
            "#S#",
            " # "
        ],
        rondache: [
            "###",
            "#S#",
            "###"
        ],
        roundshield: [
            " # ",
            "#S#",
            " # "
        ],
        target: [
            " # ",
            "#S#",
            " # "
        ]
    }

    for (let shieldType in registry) {

        registry[shieldType].forEach(entry => {

            let shield = entry.id;
            let mat = entry.material;

            if (!materials[mat]) return;
            if (mat == 'wood') return;

            let pattern = recipePatterns[shieldType];
            if (!pattern) return;

            let [namespace, name] = shield.split(':');
            if (namespace == 'magistuarmory') {
                namespace = 'forging'
            }

            let key = {
                "#": { item: materials[mat].ingot },
                "S": { item: `magistuarmory:wood_${shieldType}` }
            };

            let count = pattern.reduce((sum, row) => sum + (row.split('#').length - 1), 0);
            count = Math.max(count, 4);

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
                result: { item: shield },
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