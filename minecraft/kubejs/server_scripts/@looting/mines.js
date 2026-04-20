
const mineTypes = [
    'silver',
    'gold'
]

mineTypes.forEach(mineType => {
    BlockEvents.rightClicked('lootr:lootr_chest', event => {
        if (event.hand !== 'main_hand') return;

        const player = event.player;
        const be = event.block.entity;
        if (!be) return;

        const mainhand = player.getMainHandItem();

        if (!isInStructure(player, `darkages:overworld/${mineType}_mine`)) return;

        let users = be.persistentData.users;
        if (!users) {
            users = [];
            be.persistentData.users = users;
        }

        const username = player.username;

        function cancelEvent(player, event) {
            player.tell(Text.red("\uDB81\uDC43 You don't have permission to collect from this mine.").italic());
            event.cancel();
            return;
        }

        if (!users.toString().includes(player.username)) {
            if (mainhand.id != 'darkages:contract') {
                cancelEvent(player, event)
            }
            else if (!mainhand.nbt || !mainhand.nbt.contract) {
                cancelEvent(player, event)
            }
            else if (mainhand.nbt.contract != `${mineType}_mine`) {
                cancelEvent(player, event)
            }
        }

        if (mainhand.id === 'darkages:contract' && mainhand.nbt.contract === `${mineType}_mine`) {
            mainhand.count--;
            users.push(username);
            be.persistentData.users = users;
        }
    });
})