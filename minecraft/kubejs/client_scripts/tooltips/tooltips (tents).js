ItemEvents.tooltip((tooltip) => {

  let tents = Ingredient.of(/simplytents/).itemIds;

  tooltip.addAdvanced(tents, (item, advanced, text) => {
   if (item.id.includes('roof') || item.id.includes('wall')) {
    text.add(Text.of('Cooling').blue())
    return;
   }
   text.add(Text.of('Warming').gold())
  });
});