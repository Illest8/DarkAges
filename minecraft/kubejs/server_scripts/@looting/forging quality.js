function weightedRandom(weights) {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    const roll = Math.random() * total;
    let cumulative = 0;
    for (const [key, weight] of Object.entries(weights)) {
        cumulative += weight;
        if (roll < cumulative) return key;
    }
}

function getRandomForgingQuality() {
    return weightedRandom({
        poor: 0.4,
        well: 0.45,
        expert: 0.1,
        perfect: 0.04,
        master: 0.01
    });
}

// LootJS.modifiers(event => {
//     event.addLootTypeModifier(LootType.ENTITY)
//         .modifyLoot(ItemFilter.DAMAGEABLE, itemStack => {
//             itemStack.nbt = itemStack.nbt ?? {};
//             itemStack.nbt.ForgingQuality = getRandomForgingQuality();
//             return itemStack;
//         });
// });