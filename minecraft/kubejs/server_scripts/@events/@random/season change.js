
NativeEvents.onEvent($EventPriority.NORMAL, false, $NewSeason, event => {
    try {
        let roll = Math.random() * 100;
        if (roll < 75) return;

        let server = Utils.getServer();

        if (server.persistentData.dailyEvents == false) return;

        event.level.players.forEach(player => {
            let faction = player.persistentData.faction;
            if (!faction) return;

            let worth = player.getStats().get(Stats.CUSTOM.get(global.WORTH));
            updateFactionPlayer(server, faction, player, worth);
        });

        recalculateAllFactionScores(server);

        let newEra = formatEra(Math.round(Math.random() * 4));
        server.persistentData.era = newEra;

        if (newEra == 'attrition') {
            server.runCommandSilent('ctrl setphase monster');
        } else {
            server.runCommandSilent('ctrl clearphase monster');
        }

        event.level.players.forEach(player => {
            player.sendData('darkages:era', { era: newEra });
        });

    } catch (e) {
        console.error("Error in SolarTermChangeEvent:", e);
    }
});

function formatEra(eraNumber) {
    let eraString = 
    eraNumber == 0 ? "plague" :
    eraNumber == 1 ? "silk_road" :
    eraNumber == 2 ? "dark_ages" :
    eraNumber == 3 ? "enlightenment" :
    eraNumber == 4 ? "attrition" :
    "none";
    return eraString
}

const $GrowEvent = Java.loadClass('net.minecraftforge.event.level.BlockEvent$CropGrowEvent$Pre')

NativeEvents.onEvent($EventPriority.LOW, false, $GrowEvent, event => {
    let serverEra = event.level.server.persistentData.era
    if (serverEra == 'dark_ages') {
        event.setResult('deny')
    }
})

