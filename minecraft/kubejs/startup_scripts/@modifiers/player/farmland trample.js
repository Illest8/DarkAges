ForgeEvents.onEvent('net.minecraftforge.event.level.BlockEvent$FarmlandTrampleEvent', event => {
    event.setCanceled(true)
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.BonemealEvent', event => {
    let serverEra = event.level.server.persistentData.era
    if (serverEra == 'dark_ages') {
        event.setCanceled(true)
    }
})