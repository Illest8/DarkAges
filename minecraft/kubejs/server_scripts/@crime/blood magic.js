
const $SpellCast = Java.loadClass('io.redspace.ironsspellbooks.api.events.SpellPreCastEvent')


NativeEvents.onEvent($EventPriority.NORMAL, true, $SpellCast, event => {
    let player = event.entity
    if (!player) return;

    let spellSchool = event.getSchoolType().getDisplayName()
    if (!spellSchool.string.includes('Blood')) return;
    if (!isInLawStructure(player)) return;
    if (isInLawStructure(player)) {
        if (player.stages.has('warned')) {
            let aabb = player.getBoundingBox().inflate(20);
            let nearby = player.level.getEntitiesWithin(aabb);
            let caught = false;

            nearby.forEach(e => {
                if (
                    e.type === 'mca:female_villager' ||
                    e.type === 'mca:male_villager' ||
                    e.type === 'darkages:guard'
                ) {
                    if (global.canSeePlayer(e, player)) {
                        caught = true;
                        // if (e.type != 'darkages:guard') 
                            player.tell(Text.white(`${e.getDisplayName().string}: I saw you casting blood magic!`));
                    }
                }
            });

            if (caught) {
                player.potionEffects.add('darkages:crime', 1200, 0, false, false);
            }

            return;
        }
    }
    player.tell(Text.red('Warning: Blood magic is illegal in kingdoms and villages.'));
    player.stages.add('warned');
    event.setCanceled(true)
})
