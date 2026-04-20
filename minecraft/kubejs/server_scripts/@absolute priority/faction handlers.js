// ------------------------------------------------------
// PATH RESOLVER
// ------------------------------------------------------
function factionPath(server) {
    return "saves/" + server.getWorldData().levelName + "/serverconfig/factions.json";
}
ServerEvents.loaded(event => {
    let server = event.server;
    if (server.persistentData.factionsLoaded) return;

    let path = factionPath(server);

    function rand() {
        return Math.floor(Math.random() * 101);
    }

    let jsonContent = {
        aurelith: { baseScore: rand(), playerScore: 0, score: 0, players: [] },
        solen: { baseScore: rand(), playerScore: 0, score: 0, players: [] },
        verden: { baseScore: rand(), playerScore: 0, score: 0, players: [] }
    };

    for (const f in jsonContent) {
        jsonContent[f].score = jsonContent[f].baseScore;
    }

    JsonIO.write(path, jsonContent);
    server.persistentData.factionsLoaded = true;
});

// ------------------------------------------------------
// UPDATE PLAYER ENTRY (NO RECALC)
// ------------------------------------------------------
function updateFactionPlayer(server, faction, player, netWorth) {
    let path = factionPath(server);
    let data = JsonIO.read(path) || {};

    if (!data[faction]) {
        data[faction] = { baseScore: 0, playerScore: 0, score: 0, players: [] };
    }

    let uuid = player.getStringUuid();
    let name = player.name.string;

    let entry = null;
    for (let i = 0; i < data[faction].players.length; i++) {
        if (data[faction].players[i].uuid === uuid) {
            entry = data[faction].players[i];
            break;
        }
    }

    if (entry) {
        entry.netWorth = netWorth;
        entry.name = name;
    } else {
        data[faction].players.push({
            uuid: uuid,
            name: name,
            netWorth: netWorth
        });
    }

    JsonIO.write(path, data);
    return true;
}

// ------------------------------------------------------
// RECALCULATE SCORES + RANKS (ONLY WHEN CALLED)
// ------------------------------------------------------
function recalculateAllFactionScores(server) {
    try {
        let path = factionPath(server);
        let data = JsonIO.read(path) || {};

        let rankingArray = [];

        for (let faction in data) {
            if (!data.hasOwnProperty(faction)) continue;
            if (faction === "ranks") continue;

            let f = data[faction];

            if (!f.players) f.players = [];

            f.baseScore = Number(f.baseScore) || 0;

            let playerTotal = 0;
            for (let i = 0; i < f.players.length; i++) {
                playerTotal += Number(f.players[i].netWorth) || 0;
            }

            f.playerScore = playerTotal;
            f.score = f.baseScore + f.playerScore;

            rankingArray.push({ name: faction, score: f.score });
        }

        rankingArray.sort((a, b) => b.score - a.score);

        let ranks = {};
        for (let i = 0; i < rankingArray.length; i++) {
            ranks[rankingArray[i].name] = i + 1;
        }

        data.ranks = ranks;

        JsonIO.write(path, data);
        return true;

    } catch (e) {
        console.log("Error recalculating faction scores:", e);
        return false;
    }
}

// ------------------------------------------------------
// RANK ACCESSOR FOR OTHER SCRIPTS
// ------------------------------------------------------
function getFactionRank(server, faction) {
    let path = factionPath(server);
    let data = JsonIO.read(path) || {};
    if (!data.ranks) return null;
    return data.ranks[faction] || null;
}

// ------------------------------------------------------
// COMMANDS (JOIN / LEAVE / SCORE MODIFY)
// ------------------------------------------------------
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal("faction")
            .then(
                Commands.argument("mode", Arguments.STRING.create(event))
                    .suggests((ctx, builder) => {
                        builder.suggest("set");
                        builder.suggest("add");
                        return builder.buildFuture();
                    })
                    .then(
                        Commands.argument("amount", Arguments.INTEGER.create(event))
                            .then(
                                Commands.argument("faction", Arguments.STRING.create(event))
                                    .suggests((ctx, builder) => {
                                        let server = ctx.source.server;
                                        let data = JsonIO.read(factionPath(server)) || {};
                                        Object.keys(data).forEach(name => {
                                            if (name.includes('rank')) return;
                                            builder.suggest(name)
                                        });
                                        return builder.buildFuture();
                                    })
                                    .executes(ctx => {
                                        let server = ctx.source.server;
                                        let mode = Arguments.STRING.getResult(ctx, "mode");
                                        let amount = Arguments.INTEGER.getResult(ctx, "amount");
                                        let faction = Arguments.STRING.getResult(ctx, "faction");

                                        let path = factionPath(server);
                                        let data = JsonIO.read(path) || {};

                                        if (!data[faction]) {
                                            data[faction] = { baseScore: 0, playerScore: 0, score: 0, players: [] };
                                        }

                                        if (mode === "add") {
                                            data[faction].score += amount;
                                        } else {
                                            data[faction].score = amount;
                                        }

                                        JsonIO.write(path, data);
                                        recalculateAllFactionScores(server);

                                        ctx.source.player.tell(`§aFaction §e${faction} §ahas new score: §b${data[faction].score}`);
                                        return data[faction].score;
                                    })
                            )
                    )
            )

            // -------------------------
            // /faction join <faction>
            // -------------------------
            .then(
                Commands.literal("join")
                    .then(
                        Commands.argument("faction", Arguments.STRING.create(event))
                            .suggests((ctx, builder) => {
                                let server = ctx.source.server;
                                let data = JsonIO.read(factionPath(server)) || {};
                                Object.keys(data).forEach(name => builder.suggest(name));
                                return builder.buildFuture();
                            })
                            .executes(ctx => {
                                let player = ctx.source.player;
                                let server = player.server;
                                let faction = Arguments.STRING.getResult(ctx, "faction");

                                let path = factionPath(server);
                                let data = JsonIO.read(path) || {};

                                if (!data[faction]) {
                                    player.tell(`§cFaction '${faction}' does not exist.`);
                                    return 0;
                                }

                                player.persistentData.faction = faction;

                                let worth = player.getStats().get(Stats.CUSTOM.get(global.WORTH));
                                updateFactionPlayer(server, faction, player, worth);

                                recalculateAllFactionScores(server);

                                player.tell(`§aYou joined faction §e${faction}§a.`);
                                return 1;
                            })
                    )
            )

            // -------------------------
            // /faction leave
            // -------------------------
            .then(
                Commands.literal("leave")
                    .executes(ctx => {
                        let player = ctx.source.player;
                        let server = player.server;
                        let faction = player.persistentData.faction;

                        if (!faction) {
                            player.tell("§cYou are not in a faction.");
                            return 0;
                        }

                        let path = factionPath(server);
                        let data = JsonIO.read(path) || {};

                        if (!data[faction]) {
                            delete player.persistentData.faction;
                            player.tell("§cYour faction does not exist in storage.");
                            return 0;
                        }

                        data[faction].players = data[faction].players.filter(p => p.uuid !== player.uuid);

                        JsonIO.write(path, data);
                        delete player.persistentData.faction;

                        recalculateAllFactionScores(server);

                        player.tell(`§aYou have left faction §e${faction}§a.`);
                        return 1;
                    })
            )
    );
});