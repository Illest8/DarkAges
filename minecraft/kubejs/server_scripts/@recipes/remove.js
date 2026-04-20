


ServerEvents.recipes(event => {
  event.remove({ not: { type: 'minecraft:smelting' }, output: 'bread' })
  event.remove('supplementaries:key')
  event.remove('iceandfire:copper_sword')
  event.remove({ not: { type: 'apotheosis:fletching' }, output: 'iceandfire:amphithere_arrow' })
})

let epicFightCrafting = Ingredient.of(/epicfight:/).itemIds;
ServerEvents.recipes(event => {
  epicFightCrafting.forEach(item => {
    event.remove({ type: 'minecraft:crafting_shaped', output: item })
  })
})

let byeWom = Ingredient.of(/wom|cdmoveset/).itemIds
ServerEvents.recipes(event => {
  byeWom.forEach(item => {
    event.remove({ type: 'minecraft:smithing_transform', output: item })
    event.remove(item)
  })
})

let byeCreate = Ingredient.of(/create:/).itemIds
ServerEvents.recipes(event => {
  byeCreate.forEach(item => {
    event.remove({ type: 'minecraft:crafting_shaped', output: item })
  })
})

let byeFarmors = Ingredient.of(/fantasy_armor/).itemIds
ServerEvents.recipes(event => {
  byeFarmors.forEach(item => {
    event.remove(item)
  })
})

let byeOvergeared = Ingredient.of(/blade|head|decoration/).itemIds
ServerEvents.recipes(event => {
  byeOvergeared.forEach(item => {
    event.remove({ type: 'overgeared:forging', output: item })
    event.remove({ type: 'minecraft:crafting_shapeless', output: item })
  })
})

let byeMagistu = Ingredient.of(/magistuarmory/).itemIds
ServerEvents.recipes(event => {
  byeMagistu.forEach(item => {
    if (item.includes('hilt')) return;
    event.remove({ type: 'minecraft:smithing_transform', output: item })
    event.remove(item)
  })
})

let signPosts = Ingredient.of(/sign_post/).itemIds
ServerEvents.recipes(event => {
  signPosts.forEach(item => {
    event.remove(item)
  })
})

let createTypes = [
  'create:draining',
  'create:conversion',
  'create:crushing',
  'create:cutting',
  'create:milling',
  'create:basin',
  'create:mixing',
  'create:compacting',
  'create:pressing',
  'create:sandpaper_polishing',
  'create:splashing',
  'create:haunting',
  'create:deploying',
  'create:filling',
  'create:emptying',
  'create:item_application',
  'create:mechanical_crafting',
  'create:sequenced_assembly',
  'cataclysm:weapon_fusion',
  'cataclysm:amethyst_bless',
  'iceandfire:dragonforge',
  'overgeared:alloy_smelting',
  'overgeared:grinding',
  'overgeared:casting',
  'overgeared:nether_alloy_smelting'
]

ServerEvents.recipes(event => {
  event.forEachRecipe(Ingredient.all, recipe => {
    createTypes.forEach(recipeType => {
      event.remove({ type: recipeType })
    }
    )
  })
})

ServerEvents.recipes(event => {
  event.remove({ type: 'minecraft:crafting_shapeless', output: 'minecraft:gold_nugget' })
})