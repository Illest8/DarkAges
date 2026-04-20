
function getOilDef(name) {
  return global.oils.find(function(o) {
    return o.name.toLowerCase() === name.toLowerCase();
  });
}

function hexToInt(hex) {
  return parseInt(hex, 16);
}

function getOilIcon(name) {
  var index = -1;

  for (var i = 0; i < global.oils.length; i++) {
    if (global.oils[i].name.toLowerCase() === name.toLowerCase()) {
      index = i;
      break;
    }
  }

  if (index < 0) return "";

  var codepoint = 0xF000 + index;
  return String.fromCharCode(codepoint);
}

ItemEvents.tooltip(function(tooltip) {
  tooltip.addAdvanced(Ingredient.all, function(item, advanced, text) {
    if (item.nbt && item.nbt.Oils) {
      var oil = item.nbt.Oils[0];
      var def = getOilDef(oil.Oil.toLowerCase());
      var rgb = hexToInt(def.color);

      var icon = getOilIcon(oil.Oil);

      var iconText = Text.of(icon); // uncolored
      var coloredText = Text.of(" " + oil.Oil + " " + oil.Uses).color(rgb);

      text.add(iconText.append(coloredText));
    }
  });
});

ItemEvents.tooltip(tooltip => {
  tooltip.addAdvanced(/darkages:.*_vial/, (item, advanced, text) => {
    let id = String(item.id);
    let raw = id.substring("darkages:".length, id.length - "_vial".length);
    let oilName = raw.charAt(0).toUpperCase() + raw.slice(1);

    let def = getOilDef(raw);
    let rgb = hexToInt(def.color);

    let colored = Text.of(`${oilName} Oil`).color(rgb);

    text.clear();
    text.add(colored);
  });
});