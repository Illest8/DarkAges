ItemEvents.tooltip((tooltip) => {

  const isFood = Ingredient.of(/tide:.*|farmersdelight:.*|dragnlivestock:.*|minecraft:.*|iceandfire:.*|quark:.*|vital_herbs:.*/)

  tooltip.addAdvanced(isFood, (item, advanced, text) => {
    if (!item.isEdible()) return;

    let foodEffects = item.getItem().getFoodProperties().getEffects()
    if (foodEffects && tooltip.shift) {
      foodEffects.forEach(foodEffect => {
        let key = Text.translate(foodEffect.getFirst().descriptionId);
        let amplifier = foodEffect.first.amplifier + 1;
        let duration = foodEffect.first.duration;
        text.add(Text.of('\uDB81\uDC35 ').append(Text.blue(key).append(' ' + toRoman(amplifier)).append(' (' + duration/20 + 's)')));
      })
    }
    if (item.getItem().getFoodProperties().getNutrition() == 1) {
      text.add(1, Text.of('\uE223'))
      return;
    }
    text.add(1, [Text.of('\uE223'), Text.of('x').darkGray(), Text.of(`${item.getItem().getFoodProperties().getNutrition()}`).darkGray()])
  });
});

function toRoman(num) {
  const map = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let result = "";

  for (const entry of map) {
    while (num >= entry.value) {
      result += entry.numeral;
      num -= entry.value;
    }
  }

  return result;
}