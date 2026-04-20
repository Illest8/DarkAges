StartupEvents.postInit(event => {

    const shieldTypes = [
        'target',
        'kiteshield',
        'roundshield',
        'ellipticalshield',
        'heatershield',
        'rondache',
        'buckler'
    ].sort();

    const materials = [
        "silver",
        "iron",
        "golden",
        "gold",
        "diamond",
        "steel",
        "netherite",
        "wood",
        "stone",
        "copper"
    ];

    const materialList = materials.join("|");

    global.shieldRegistry = {};

    shieldTypes.forEach(type => {
        global.shieldRegistry[type] = [];

        const regex = new RegExp(`^(${materialList})_${type}$`);

        Ingredient.of(/.*/).itemIds.forEach(id => {
            const clean = id.split(":")[1];

            if (!regex.test(clean)) return;

            const material = clean.split("_")[0];

            global.shieldRegistry[type].push({
                id: id,
                material: material
            });
        });
    });

    // console.log("Shield registry built:", global.shieldRegistry);
});