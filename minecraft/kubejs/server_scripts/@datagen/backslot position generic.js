
global.weaponBackPositions = {
    ahlspiess: { y: 0.1, z: -0.05, rotZ: 9.0, scale: 2.87 },
    bastardsword: { x: 0.375, y: 0.65, rotY: -90, scale: 1.33 },
    claymore: { z: -0.05, rotZ: -90, scale: 1.8 },
    concavehalberd: { x: -0.4, y: -0.2, rotZ: 90, scale: 2 },
    dagger: { x: 0.05, y: 0.325, z: -0.05, scale: 0.666 },
    estoc: { x: 0.15, z: -0.05, scale: 1.7 },
    greatsword: { z: -0.1, scale: 2.0 },
    guisarme: { x: -0.125, y: -0.125, z: -0.05, rotX: -13.5, rotZ: 81, scale: 1.6 },
    heavymace: { x: 0.375, y: 0.65, rotX: -54, scale: 1 },
    heavywarhammer: { x: -0.4, y: -0.4, z: -0.05, rotZ: -270, scale: 2 },
    katzbalger: { scale: 1 },
    lochaberaxe: { x: 0.4, y: -0.275, rotY: -180, rotZ: 90, scale: 1.9 },
    longsword: { scale: 1 },
    lucernhammer: { scale: 2 },
    morgenstern: { scale: 1.2 },
    pike: { scale: 1.5 },
    shortsword: { x: 0.4, y: 0.625, z: -0.1, rotY: -90, scale: 0.75 },
    spear: { x: 0.175, z: -0.1, rotZ: 180, scale: 1.5 },
    sword: { z: -0.1, scale: 0.8 },
    stylet: { x: 0.05, y: 0.525, z: -0.075, rotZ: 45, scale: 0.8 },
    tachi: { x: 0.125, z: -0.05, rotY: 180, scale: 1.369 },
    zweihander: { scale: 1.5 }
};

global.shieldBackPositions = {
    buckler: { x: 0.125, y: -0.125, z: -0.1, scale: 0.39 },
    ellipticalshield: { x: 0.1, y: -0.325, z: -0.1, scale: 0.39 },
    heatershield: { x: 0.1, y: -0.225, z: -0.1, scale: 0.372 },
    kiteshield: { x: 0.1, y: -0.125, z: -0.1, scale: 0.5 },
    rondache: { x: 0.1, y: -0.125, z: -0.1, scale: 0.336 },
    roundshield: { x: 0.1, y: -0.35, z: -0.1, scale: 0.354 },
    target: { x: 0.125, y: -0.125, z: -0.1, scale: 0.336 }
}

const backslotItems = {
    'dragnlivestock:covered_wagon': { x: 0.025, y: 0.15, z: -0.05, rotX: -90, scale: 1.75 },
    'simplytents:zip_tent': { rotZ: 63, scale: 0.5 },
    'simplytents:tent': { rotZ: 63, scale: 0.5 },
    'simplytents:roof_tent': { rotZ: 63, scale: 0.5 },
    'simplytents:wall_tent': { rotZ: 63, scale: 0.5 }
};

ServerEvents.highPriorityData(event => {
    const defaults = {
        x: 0.0,
        y: 0.0,
        z: -0.1,
        rotX: 0.0,
        rotY: 0.0,
        rotZ: 0.0,
        scale: 1.0
    };

    let overrides = {};

    for (const type in global.weaponRegistry) {
        let items = global.weaponRegistry[type];
        if (!items.length) continue;

        let preset = global.weaponBackPositions[type] || {};

        let merged = {
            x: preset.x ?? defaults.x,
            y: preset.y ?? defaults.y,
            z: preset.z ?? defaults.z,
            rotX: preset.rotX ?? defaults.rotX,
            rotY: preset.rotY ?? defaults.rotY,
            rotZ: preset.rotZ ?? defaults.rotZ,
            scale: preset.scale ?? defaults.scale
        };

        items.forEach(entry => {
            let key = `back_weapon|0|${entry.id}`;
            overrides[key] = merged;
        });
    }

    for (const type in global.shieldRegistry) {
        let items = global.shieldRegistry[type];
        if (!items.length) continue;

        let preset = global.shieldBackPositions[type] || {};

        let merged = {
            x: preset.x ?? defaults.x,
            y: preset.y ?? defaults.y,
            z: preset.z ?? defaults.z,
            rotX: preset.rotX ?? defaults.rotX,
            rotY: preset.rotY ?? defaults.rotY,
            rotZ: preset.rotZ ?? defaults.rotZ,
            scale: preset.scale ?? defaults.scale
        };

        items.forEach(entry => {
            let key = `back_weapon|0|${entry.id}`;
            overrides[key] = merged;
        });
    }

    for (let id in backslotItems) {
        let preset = backslotItems[id];

        let merged = {
            x: preset.x ?? defaults.x,
            y: preset.y ?? defaults.y,
            z: preset.z ?? defaults.z,
            rotX: preset.rotX ?? defaults.rotX,
            rotY: preset.rotY ?? defaults.rotY,
            rotZ: preset.rotZ ?? defaults.rotZ,
            scale: preset.scale ?? defaults.scale
        };

        let key = `back_weapon|0|${id}`;
        overrides[key] = merged;
    }

    let finalJson = {
        overrides: overrides,
        sittingOverrides: {}
    };

    JsonIO.write(
        "config/epicfight_curios_compat_positions.json",
        finalJson
    );
});