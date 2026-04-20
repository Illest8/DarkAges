const /**@type {Map<number, Internal.AbstractContainerMenu>} */ playerMenuMap = new Map()

const InvScreen = Java.loadClass('net.minecraft.world.inventory.AbstractContainerMenu')
PlayerEvents.inventoryOpened(event => {
    const { player, inventoryContainer } = event
    playerMenuMap.set(player.uuid.hashCode(), inventoryContainer)
})

PlayerEvents.inventoryClosed(event => {
    playerMenuMap.delete(event.player.uuid.hashCode())
})

PlayerEvents.inventoryChanged(event => {
    const { player, slot } = event

    if (slot < 0) return

    const playerMenu = playerMenuMap.get(player.uuid.hashCode())
    let item

    if (playerMenu) {
        if (slot >= playerMenu.slots) return
        item = playerMenu.getSlot(slot).item
    } else {
        const inv = player.inventory
        if (slot >= inv.getContainerSize()) return
        item = inv.getItem(slot)
    }

    const info = item?.nbt
    if (!info) return

    if (info.Stolen === 0) {
        info.Stolen = 1
        item.nbt = info
    }
})