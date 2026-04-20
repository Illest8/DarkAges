// events/scheduler.js

const TRIGGER_WINDOW = 3000;
let pendingPlayers = new Set();

NativeEvents.onEvent($EventPriority.NORMAL, false, $NewSeason, event => {
    const level = event.level;
    const server = level.server;

    if (level.isClientSide()) return;

    const state = global.EventState.data;

    level.players.forEach(player => {
        state.players[player.username] = {
            seasonTick: server.tickCount,  // ALWAYS valid
            offsetTicks: Math.floor(Math.random() * TRIGGER_WINDOW),
            fired: false
        };

        pendingPlayers.add(player.username);
    });

    global.EventState.save(server);

    console.log(`[SeasonEvent] New season — queued ${level.players.length} players.`);
});

ServerEvents.tick(event => {
    const server = event.server;
    if (!server) return;

    const tick = server.tickCount;

    if (tick % 200 !== 0) return;

    const state = global.EventState.data;

    let usernames = Array.from(pendingPlayers);

    for (let i = 0; i < usernames.length; i++) {
        let username = usernames[i];

        let player = server.getPlayer(username);
        if (!player) continue;

        let pdata = state.players[username];
        if (!pdata || pdata.fired) {
            pendingPlayers.delete(username);
            continue;
        }

        let target = pdata.seasonTick + pdata.offsetTicks;

        if (tick >= target && tick < target + 200) {
            pdata.fired = true;
            pendingPlayers.delete(username);
            let selected = pickConditional(global.DailyEventPool, server, player);
            if (selected) selected.run(server, player);

            console.log("[SeasonEvent] '" + (selected ? selected.id : "none") + "' fired for " + username);
        }
    }
});