ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract', event => {
    let player = event.getEntity();
    let target = event.getTarget();
    if (!player || !target) return;

    let handSlots = player.getHandSlots().toString();
    let owner = target.persistentData.isOwner;
    if (handSlots.includes('cage')) {
        if (!owner || owner !== player.username) {
            event.setCanceled(true);
            if (event.hand == 'MAIN_HAND') {
                player.tell(`You must be the owner to use a cage on ${target.getDisplayName().getString()}.`);
            }
            return;
        }
        return;
    }

    if (handSlots.includes('lead')) {
        if (!owner || owner === player.username) {
            return;
        } else {
            event.setCanceled(true)
            if (event.hand == 'MAIN_HAND') {
                player.tell(`This ${target.getDisplayName().getString()} belongs to ${owner}.`);
                let item = player.mainHandItem.id;
                let count = player.mainHandItem.count;
                player.setMainHandItem('air');
                player.setMainHandItem(Item.of(item, count));
            }
            return;
        }
    }
});