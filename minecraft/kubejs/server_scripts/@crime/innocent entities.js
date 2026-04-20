
let protectedEntities = [
    'mca:female_villager',
    'mca:male_villager',
    'darkages:knight',
    'darkages:guard'
]

protectedEntities.forEach(protectedEntity => {
    EntityEvents.hurt(protectedEntity, event => {
        if (event.source.getType() == 'indirectMagic') {event.cancel()}
        let player = event.source.player
        if (!player) return;
        if (isInLawStructure(player)) {
        player.potionEffects.add('darkages:crime', 6000, 0, false, false)
        // player.tell(Text.red(`Hitting ${event.entity.displayName.getString()} is a crime.`))
        }
    })
})
