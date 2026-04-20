ServerEvents.recipes(event => {
  let spells = JsonIO.read('kubejs/data/darkages/recipes/rituals.json')

  if (!spells) {
    console.error('[SpellLoader] Failed to load rituals.json! from data/darkages/recipes.rituals.json')
    return
  }

  const inks = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5
  }

  for (const spellId in spells) {
    let recipe = spells[spellId];
    let input1 = parseInput(recipe.input1);
    let input2 = parseInput(recipe.input2);

    for (const rarity in inks) {
      event.recipes.summoningrituals
        .altar('paper')
        .input(input1)
        .input(input2)
        .input(`irons_spellbooks:${rarity}_ink`)
        .recipeTime(100)
        .itemOutput(Item.of(
          `irons_spellbooks:scroll`,
          `{ISB_Spells:{data:[{id:"${spellId}",index:0,level:${inks[rarity]},locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}`
        ));
    }
  }

  function parseInput(input) {
    if (!input) return Item.of('minecraft:air')

    if (typeof input === 'string' || input instanceof String) {
      return Item.of(input.toString())
    }

    if (input.tag) {
      //console.log('[parseInput] tag input:', input.tag) debug loaded tags
      return Item.of(input.tag)
    }

    if (input.item) {
      let nbt = {}
      try {
        if (input.nbt) {
          nbt = JSON.parse(input.nbt)
        }
      } catch (e) {
        console.warn('[parseInput] Failed to parse NBT JSON:' + input.nbt)
      }
      return Item.of(Item.of(input.item, input.count || 1, nbt))
    }

    console.warn('[parseInput] Unknown input type:' + input)
    return Item.of('minecraft:air')
  }
})

SummoningRituals.complete(event => {
  const player = event;
  if (event.getLevel() != 'minecraft:the_nether') return;
  if (event.recipe.outputs.forEach(output => {
    output.name.toString().includes('Sap')
    player.tell('YES')
    return;
  }))
  server.runCommandSilent('say success')
})