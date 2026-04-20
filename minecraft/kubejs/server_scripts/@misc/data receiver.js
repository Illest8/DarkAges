NetworkEvents.dataReceived("dialog_open", event => {
    const player = event.player;

    player.stopUsingItem()
});

NetworkEvents.dataReceived('player_preference', event=> {
    let { data, player, server } = event;

    if (data.stealth && data.stealth == 'Off') {
        player.runCommandSilent(`cloakanddagger toggle ${player.username} overlay false`)
    }

})