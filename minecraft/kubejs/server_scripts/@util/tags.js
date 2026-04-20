
ServerEvents.tags('item', event => {
  let herbs = Ingredient.of('@vital_herbs').itemIds
  herbs.forEach(herb => {
    event.remove('minecraft:crops', herb)
  })
})