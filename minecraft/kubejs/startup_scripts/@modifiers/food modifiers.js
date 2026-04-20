const foodEffects = {
  'farmersdelight:shepherds_pie': f => (f.removeEffect('farmersdelight:nourishment'), f.effect('irons_spellbooks:instant_mana', 1, 2, 1)),
  'farmersdelight:melon_popsicle': f => f.effect('legendarysurvivaloverhaul:heat_resistance', 1200, 2, 1),
  'farmersdelight:squid_ink_pasta': f => (f.removeEffect('farmersdelight:nourishment'), f.effect('darkness', 60, 1, 1), f.effect('footwork:conceal', 300, 2, 1)),
  'farmersdelight:pasta_with_meatballs': f => f.effect('strength', 600, 1, 1),
  'farmersdelight:pasta_with_mutton_chop': f => f.effect('strength', 600, 1, 1),
  'farmersdelight:nether_salad': f => (f.removeEffect('minecraft:nausea'), f.effect('minecraft:fire_resistance', 200, 0, 1)),
  'farmersdelight:apple_pie_slice': f => (f.effect('minecraft:speed', 600, 0, 1), f.fastToEat()),
  'iceandfire:cannoli': f => f.fastToEat(),
  'minecraft:apple': f => f.effect('minecraft:speed', 600, 0, 1),
  'minecraft:beetroot': f => f.fastToEat(),
  'minecraft:bread': f => f.effect('minecraft:haste', 600, 1, 1),
  'minecraft:cooked_beef': f => (f.effect('darkages:stamina_charge', 200, 2, 1), f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 1, 1)),
  'minecraft:cooked_chicken': f => (f.effect('darkages:stamina_charge', 200, 2, 1), f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 1, 1)),
  'minecraft:cooked_mutton': f => (f.effect('darkages:stamina_charge', 200, 2, 1), f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 1, 1)),
  'minecraft:cooked_porkchop': f => (f.effect('darkages:stamina_charge', 200, 2, 1), f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 1, 1)),
  'minecraft:cooked_rebbit': f => (f.effect('darkages:stamina_charge', 200, 2, 1), f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 1, 1)),
  'minecraft:golden_carrot': f => f.effect('minecraft:luck', 3600, 0, 1),
  'minecraft:melon_slice': f => (f.effect('minecraft:speed', 200, 0, 1), f.effect('legendarysurvivaloverhaul:heat_resistance', 200, 2, 1)),
  'minecraft:sweet_berries': f => f.effect('minecraft:speed', 200, 0, 1),
  'supplementaries:soap': f => f.removeEffect('minecraft:poison'),
  'vital_herbs:fizz_fruit': f => f.effect('irons_spellbooks:hastened', 200, 0, 1),
  'vital_herbs:frost_mint': f => f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 9, 1),
  'farmersdelight:egg_sandwich': f => f.effect('legendarysurvivaloverhaul:cold_resistance', 600, 1, 1)
}

function foodModify(id, fn) {
  ItemEvents.modification(event => {
    event.modify(id, item => {
      if (!item.edible) return;
      item.foodProperties = fn
      item.setMaxStackSize(1)
    })
  })
}

for (const id in foodEffects) {
  foodModify(id, foodEffects[id])
}