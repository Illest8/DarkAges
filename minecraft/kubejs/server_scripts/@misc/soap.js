ItemEvents.rightClicked(event => {
  const {player, item} = event;
  if (item.id != 'supplementaries:soap') return;
  if (player.isInWaterOrRain()) {
    player.tell('You are clean');
    item.count--
  }
})