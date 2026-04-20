ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added', event => {
    let player = event.entity;
    if (!player) return;
    if (player?.server?.persistentData?.era != 'plague') return;
    let effect = event.effectInstance.effect.displayName
    if (effect.string.includes('Bleed')) {
        let chance = Math.random()
        if (chance < 0.8) {
            player.persistentData.merge({disease: 'plague'})
            player.sendData('darkages:sync_variables', {
                diseases: 'plague'
            })
        }
    }
})