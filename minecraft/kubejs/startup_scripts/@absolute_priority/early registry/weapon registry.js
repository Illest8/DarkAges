global.weaponRegistry = {};

StartupEvents.postInit(event => {

    const weaponTypes = [
        "ahlspiess",
        "bastardsword",
        "claymore",
        "concavehalberd",
        "estoc",
        "guisarme",
        "heavymace",
        "heavywarhammer",
        "katzbalger",
        "lochaberaxe",
        "lucernhammer",
        "morgenstern",
        "pike",
        "shortsword",
        "stylet",
        "zweihander",
        "greatsword",
        "dagger",
        "tachi",
        "longsword",
        "spear",
        "sword"
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

    weaponTypes.forEach(type => {
        global.weaponRegistry[type] = [];

        const regex = new RegExp(`^(${materialList})_${type}$`);

        Ingredient.of(/.*/).itemIds.forEach(id => {
            const clean = id.split(":")[1];

            if (!regex.test(clean)) return;

            const material = clean.split("_")[0];

            global.weaponRegistry[type].push({
                id: id,
                material: material
            });
        });
    });
});