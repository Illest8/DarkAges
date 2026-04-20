
EntityEvents.death(event => {
    const { player, entity, source } = event
    if (!source?.player) return;
    if (!entity.getType().toString().includes('dragnlivestock')) return
    if (!isInLawStructure(entity)) return;
    source.player.potionEffects.add('darkages:crime', 6000, 0, false, false)
})