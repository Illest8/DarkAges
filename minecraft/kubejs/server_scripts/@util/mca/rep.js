
PlayerEvents.tick(event => {
  if (event.server.tickCount % 400 == 1) {
    let player = event.player;
    let town = getTown(player);
    if (town == false) {
      syncVariable(player, 'villageRep', 0);
      return;
    }

    if (town.getReputation(player)== player.persistentData.reputation) return;
    let residents = getTownResidents(player)
    residents.forEach(resident => {
     let person = findResidentByName(player, resident);
     let hearts = getResidentHearts(person, player);
     town.setReputation(player, person, hearts)
    })

     let rep = town.getReputation(player);

    if (!player.persistentData.reputation) {
      player.persistentData.reputation = 0
    }

    player.persistentData.reputation = rep
    syncVariable(player, 'villageRep', rep)
    if (!questCompleted(player, '03C2117481696F01')) {
      FTBQuests.getServerDataFromPlayer(player).reset('5CE827ADEEDC3AF1')
      questProgessAdd(player, '5CE827ADEEDC3AF1', rep)
    }
  }
});