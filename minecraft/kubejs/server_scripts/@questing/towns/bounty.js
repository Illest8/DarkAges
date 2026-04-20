BlockEvents.rightClicked(event => {
  let player = event.player;
  let item = player.getMainHandItem();
  if (item.id != 'bountiful:bounty') return;

  if (item.nbt.toString().includes(true)) {

    changeBountyCompete(player, 'add', 1)

    if (item.nbt.toString().includes('darkages:coin')) {
    player.sendData('darkages:sound', {
      sound: 'darkages:coin'
    })
  }

    if (!questCompleted(player, '2351782577D6BF81')) {
      questProgessAdd(player, '4FD59BB8F2587EAF', 1)
    }

    let lord = getTownProfession(player, 'darkages:lord');
    if (lord) {
      addResidentHearts(lord, player, 5)
      player.tell(`Lord ${lord.getDisplayName().getString()}'s rep increased by 5!`)
    }
  }
});