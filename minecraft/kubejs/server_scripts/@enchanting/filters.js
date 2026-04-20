
MoreJSEvents.enchantmentTableEnchant(event => {
    const runeColors = {
        "minecraft:knockback": "green",
        "minecraft:sharpness": "red",
        "minecraft:smite": "blue"
    };

    let item = event.item;
    if (!item || !item.nbt) return;

    let chosenColor = null;

    // Inspect the enchantments offered in each slot
    for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
        let slot = event.get(slotIndex);

        slot.forEachEnchantments((enchantment, level) => {
            let id = enchantment.getId();

            if (runeColors[id]) {
                chosenColor = runeColors[id];
            }
        });
    }

    // Only set a rune color if a mapped enchantment was found
    if (chosenColor) {
        item.nbt.putString("quark:RuneColor", chosenColor);
    }
});
