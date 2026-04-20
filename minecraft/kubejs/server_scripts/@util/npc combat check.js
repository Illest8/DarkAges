NetworkEvents.dataReceived("darkages:check_combat", event => {
    let player = event.player;
    let id = event.data.id;
    
    let entity = player.level.getEntities().find(e => e.getStringUuid().equals(id))
    if (!entity) return;

    let inCombat = entity.getCombatTracker().inCombat;
    let isTargeting = entity.getTarget()

    let isFighting = inCombat || isTargeting;

    if (isFighting) {
      player.tell(`${entity.getDisplayName().getString()} is in combat.`)
    }

    player.sendData("darkages:combat_reply", {
        id: id,
        allowed: !isFighting
    });
});