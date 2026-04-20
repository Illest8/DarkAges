function changeNetWorth(player, operation, amount) {
  const id = global.WORTH;
  const stat = Stats.CUSTOM.get(id);
  player.getStats()[operation](stat, amount);
  return;
}

function changeBountyCompete(player, operation, amount) {
  const id = global.BOUNTIES;
  const stat = Stats.CUSTOM.get(id);
  player.getStats()[operation](stat, amount);
  return;
}

function changeAssassinations(player, operation, amount) {
  const id = global.ASSASSINATIONS;
  const stat = Stats.CUSTOM.get(id);
  player.getStats()[operation](stat, amount);
  return;
}

function getNetWorth(player) {
  const id = global.WORTH;
  const stat = Stats.CUSTOM.get(id);
  return player.getStats().get(stat);
}

function getBountyCompete(player) {
  const id = global.BOUNTIES;
  const stat = Stats.CUSTOM.get(id);
  return player.getStats().get(stat);
}
function getAssassinations(player) {
  const id = global.ASSASSINATIONS;
  const stat = Stats.CUSTOM.get(id);
  return player.getStats().get(stat);
}