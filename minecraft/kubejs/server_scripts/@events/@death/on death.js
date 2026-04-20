PlayerEvents.respawned(event => {
    let player = event.player;

    player.setAttributeBaseValue('epicfight:impact', 0);
    player.setAttributeBaseValue('attributeslib:draw_speed', 0);
    player.setAttributeBaseValue('epicfight:stamina_regen', 0.04);
    player.setAttributeBaseValue('irons_spellbooks:max_mana', 0)

    if (!questCompleted(player, '76316717D51AB960')) {
        resetChapter(player, '03AAD3F81C67B2DC')
    }

    if (!questCompleted(player, '645293639B7F19F5')) {
        resetChapter(player, '7C49547E4B07F062')
    }

    if (player.isCreative() || !event.server.persistentData.nother) {
        if (event.server.persistentData.prisonSpawn) {
            teleportNextTick(event.player, event.server.persistentData.prisonSpawn);
        }
        return;
    }
    let coords = player.persistentData.spawn;
    if (!coords) {
        if (event.server.persistentData.prisonSpawn) {
            teleportNextTick(event.player, event.server.persistentData.prisonSpawn);
        }
        return;
    }

    // Teleport player to Nether
    player.server.runCommandSilent(`execute in minecraft:the_nether run tp ${player.username} ${coords.x} ${coords.y} ${coords.z}`);

    delete player.persistentData.spawn
});

EntityEvents.death(event => {
    let player = event.entity;
    if (!player || !player.isPlayer()) return;
    if (!player.level.isOverworld()) return;
    if (!event.server.persistentData.nother) return;
    player.persistentData.spawn = {
        x: player.getX(),
        y: player.getY(),
        z: player.getZ()
    };
});
