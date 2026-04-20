
// 0B1E2F43DA02C0E1 = Find out where the bandits hid the wagon parts

BlockEvents.rightClicked('iceandfire:lectern', event => {
    let player = event.player;
    if (isInStructure(player, 'darkages:overworld/bandit_captured_fort')) {
        player.tell(Text.of('Wagon Parts - Tower.').italic());

        if (!questCompleted(player, '0B1E2F43DA02C0E1') && questCompleted(player, '010B7965B6E5B186')) {
            completeQuest(player, '0B1E2F43DA02C0E1');
        }
        event.cancel();
    }
})

BlockEvents.rightClicked('lootr:lootr_chest', event => {
    let player = event.player
    if (!questCompleted(player, '0B1E2F43DA02C0E1') &&  isInStructure(player, 'darkages:overworld/bandit_captured_fort')) {
        player.tell(Text.of(`You must progress further in 'Rusted Wagon' to open.`).red().italic())
        event.cancel();
    }
    else if (questCompleted(player, '0B1E2F43DA02C0E1')) {
        completeQuest(player, '1F3BC086A749CD2D');
    }
})