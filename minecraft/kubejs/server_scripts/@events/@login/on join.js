PlayerEvents.loggedIn(event => {
  let { player, server } = event;

  player.setAttributeBaseValue('epicfight:impact', 0)
  player.setAttributeBaseValue('irons_spellbooks:max_mana', 0)
  player.setAttributeBaseValue('forge:nametag_distance', 5)
  player.setAttributeBaseValue('attributeslib:draw_speed', 0)
  player.setAttributeBaseValue('epicfight:stamina_regen', 0.04)
  player.setAttributeBaseValue('darkages:stamina_regen', 1)
  player.setAttributeBaseValue('attributeslib:mining_speed', 5)
  player.runCommandSilent('updateStats')


  if ($check("stage", player, "join", true)) {
    player.stages.add('join')

    changeBountyCompete(player, 'set', 0)
    changeNetWorth(player, 'set', 0)
    changeAssassinations(player, 'set', 0)
    

    player.server.runCommandSilent(`epicfight skill add ${player.username} dodge epicfight:roll`)
    player.server.runCommandSilent(`epicfight skill add ${player.username} guard epicfight:guard`)

    player.persistentData.pvpOff = true;

    if (server.persistentData.prisonSpawn) {
      teleportNextTick(event.player, server.persistentData.prisonSpawn)
    }
    server.persistentData.player_count++
  }

  let level = getSkillCategoryLevel(player, 'darkages:darkages');
  player.sendData('darkages:sync_variables', {
    level: level,
    era: server.persistentData.era
  });
  let time = Math.floor(event.level.getTime() / 24000)
  server.runCommandSilent(`title ${player.username} title {"text": "Day ${time}"}`)
})
