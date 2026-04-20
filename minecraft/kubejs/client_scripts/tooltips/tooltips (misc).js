ItemEvents.tooltip((tooltip) => {
  tooltip.addAdvanced('ftbquests:detector', (item, advanced, text) => {
    text.add(1, Text.blue('Rename to the quest ID to give the player.'))
  });
});