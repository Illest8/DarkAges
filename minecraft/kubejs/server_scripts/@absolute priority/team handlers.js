const FTBTeamsAPI = Java.loadClass('dev.ftb.mods.ftbteams.api.FTBTeamsAPI');

FTBTeamsEvents.playerJoinedParty(event => {
  const player = event.player;
  const team = getTeam(player)
  const teamName = getTeamName(player)

  if (team.owner == player.uuid) {
    // console.log(`[FACTION] New faction created by ${player.username}, '${teamName}'`)

    // player.tell([
    //   Text.of('You are the owner of '),
    //   Text.of(teamName).color(team.color).italic(),
    //   '!'
    // ])

    changeNetWorth(player, 'add', 1)
    return;
  }
  else event.cancel()
});

FTBTeamsEvents.playerLeftParty(event => {
  const player = event.player;
  const prevTeam = event.prevTeam;

  changeNetWorth(player, 'add', -1);
});

function getTeam(player) {
  const manager = FTBTeamsAPI.api().getManager();
  return manager.getTeamForPlayerID(player.uuid).get();
}

function getTeamById(teamId) {
  const manager = FTBTeamsAPI.api().getManager();
  try {
    let opt = manager.getTeamByID(teamId);
    if (opt && opt.isPresent) {
      let t = opt.orElse(null);
      return t;
    }
    return opt || null;
  } catch (e) {
    return null;
  }
}

function isSameTeam(playerUuid, targetUuid) {
  const manager = FTBTeamsAPI.api().getManager();
  return manager.arePlayersInSameTeam(playerUuid, targetUuid)
}

function getTeamName(player) {
  const name = getTeam(player).name.getString();
  return name;
}

function getTeamId(player) {
  const id = getTeam(player).teamId;
  return id;
}