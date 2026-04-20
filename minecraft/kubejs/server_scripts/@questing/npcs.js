
let npcs = [
    'darkages:blacksmith',
    'darkages:general',
    'darkages:friar',
    'darkages:merchant',
    'darkages:noble',
    'darkages:priestess',
    'darkages:wise_man',
    'darkages:woman'
]

npcs.forEach(npc => {
    EntityEvents.spawned(npc, event => {
            event.entity.setInvulnerable(true);
    })
})

npcs.forEach(npc => {
    ItemEvents.entityInteracted(event => {
        if (event.entity.getType() == npc) {
            if (event.entity.getCombatTracker().inCombat) event.cancel()
        }
    })
})