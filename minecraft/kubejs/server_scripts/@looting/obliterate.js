LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .removeLoot(['wom:herrscher', 'wom:ruine','wom:antitheus', 'wom:agony', 'wom:demon_seal', 'wom:diamond_armbracelet', 'wom:diamond_crown', 'wom:diamond_legbottomseal', 'wom:diamond_legtopseal', 'wom:emerald_anklebracelet', 'wom:emerald_chakra', 'wom:emerald_earrings', 'wom:emerald_tasset', 'wom:golden_chrono', 'wom:golden_kit', 'wom:golden_mokassin', 'wom:golden_monocle', 'wom:netherite_belt', 'wom:netherite_chains', 'wom:netherite_manicle', 'wom:netherite_mask', 'wom:moonless'])
})

LootJS.modifiers(event => {
    event
    .addLootTypeModifier(LootType.BLOCK)
    .removeLoot(Ingredient.of('@copycats').itemIds)
})

LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .not((n) => {
            n.anyStructure(['minecraft:jungle_pyramid', 'minecraft:desert_pyramid'], false)
        })
        .removeLoot(['epicfight:uchigatana'])
})