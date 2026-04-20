global.oils = [
  {
    name: 'halo',
    color: 'FFFA6B',
    ingredient: 'minecraft:potato',
    baseFluid: 'minecraft:water',
    uses: 5
  },
  {
    name: 'revenant',
    color: 'FF4C3F',
    ingredient: 'minecraft:carrot',
    baseFluid: 'minecraft:water',
    uses: 7
  },
  {
    name: 'echo',
    color: '694AAD',
    ingredient: 'minecraft:apple',
    baseFluid: 'minecraft:water',
    uses: 40
  },
  {
    name: 'judgement',
    color: 'CD966D',
    ingredient: 'minecraft:iron_sword',
    baseFluid: 'minecraft:water', 
    uses: 12
  },
  {
    name: 'venom',
    color: '1F5137',
    ingredient: 'minecraft:warped_fungus',
    baseFluid: 'minecraft:water', 
    uses: 8
  },
  {
    name: 'parity',
    color: 'F1E3D6',
    ingredient: 'irons_spellbooks:arcane_essence',
    baseFluid: 'minecraft:water',
    uses: 23
  },
  {
    name: 'beast',
    color: 'F1E3D6',
    ingredient: 'minecraft:oak_planks',
    baseFluid: 'minecraft:water',
    uses:4
  },
  {
    name: 'terror',
    color: '3F6C64',
    ingredient: 'minecraft:birch_planks',
    baseFluid: 'minecraft:water',
    uses: 6
  },
  {
    name: 'ravage',
    color: 'FF00FA',
    ingredient: 'minecraft:spruce_planks',
    baseFluid: 'minecraft:water',
    uses: 42
  }
]

StartupEvents.registry('fluid', event => {
  global.oils.forEach(oil => {
    const display = oil.name.charAt(0).toUpperCase() + oil.name.slice(1) + ' Oil'

    const rgb = parseInt(oil.color, 16)

    const argb = 0x80000000 | rgb

    event.create(`darkages:${oil.name}_fluid`)
      .stillTexture('minecraft:block/water_still')
      .flowingTexture('minecraft:block/water_flow')
      .color(argb)
      .displayName(display)
      .noBucket()
  })
})

StartupEvents.registry('item', event => {
  global.oils.forEach(oil => {
    const display = oil.name.charAt(0).toUpperCase() + oil.name.slice(1) + ' Oil'
    event.create(`darkages:${oil.name}_vial`, 'basic')
      .texture(`darkages:item/oil/${oil.name}`)
      .displayName(display)
      .maxStackSize(1)
      .rarity('oil')
  })
})

StartupEvents.init(event => {
    const path = `kubejs/assets/minecraft/font/default.json`;

    let existing;
    try {
        existing = JsonIO.read(path) || {};
    } catch (e) {
        existing = {};
    }

    if (!existing.providers) {
        existing.providers = [];
    }

    existing.providers = existing.providers.filter(p =>
        !(p.type === "bitmap" && p.file && p.file.startsWith("darkages:item/oil/"))
    );

    const unicodeDump = [];

    global.oils.forEach((oil, index) => {
        const codepoint = 0xF000 + index;
        const unicodeChar = String.fromCharCode(codepoint);

        existing.providers.push({
            type: "bitmap",
            file: `darkages:item/oil/${oil.name}.png`,
            ascent: 8,
            height: 9,
            chars: [unicodeChar]
        });
    });

    JsonIO.write(path, existing);
});

StartupEvents.init(event => {

    let oilTag = []
    let fluidTag = []
    global.oils.forEach(oil => {

        const brewContent = {
            type: `irons_spellbooks:alchemist_cauldron_brew`,
            base_fluid: {
                Amount: 250,
                FluidName: oil.baseFluid
            },
            input: {
                item: oil.ingredient
            },
            results: [
                {
                    Amount: 250,
                    FluidName: `darkages:${oil.name}_fluid`
                }
            ]
        }

        const emptyContent = {
            type: `irons_spellbooks:alchemist_cauldron_empty`,
            fluid: {
                Amount: 250,
                FluidName: `darkages:${oil.name}_fluid`
            },
            input: {
                item: `minecraft:glass_bottle`
            },
            result: {
                count: 1,
                item: `darkages:${oil.name}_vial`
            }
        }

        const fillContent = {
            type: `irons_spellbooks:alchemist_cauldron_fill`,
            fluid: {
                Amount: 250,
                FluidName: `darkages:${oil.name}_fluid`
            },
            input: {
                item: `darkages:${oil.name}_vial`
            },
            result: {
                count: 1,
                item: `minecraft:glass_bottle`
            }
        }

        JsonIO.write(
            `kubejs/data/darkages/recipes/alchemist_cauldron/brew_${oil.name}.json`,
            brewContent
        );

        JsonIO.write(
            `kubejs/data/darkages/recipes/alchemist_cauldron/empty_${oil.name}_vial.json`,
            emptyContent
        );

        JsonIO.write(
            `kubejs/data/darkages/recipes/alchemist_cauldron/fill_${oil.name}_vial.json`,
            fillContent
        );

        oilTag.push(`darkages:${oil.name}_vial`)
        fluidTag.push(`darkages:${oil.name}_fluid`)
    })

    let fluidContent = {
        replace: false,
        values: fluidTag
    }

    let oilContent = {
        replace: false,
        values: oilTag
    }

    JsonIO.write(
        `kubejs/data/darkages/tags/items/oil_vials.json`,
        oilContent
    )
})