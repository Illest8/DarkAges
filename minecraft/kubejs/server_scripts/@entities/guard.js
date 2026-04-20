
EntityEvents.checkSpawn('minecraft:iron_golem', event => {
    let entity = event.entity
    let newguy = event.level.createEntity('darkages:guard')
    newguy.setPosition(entity.x, entity.y, entity.z)
    newguy.spawn()
    entity.discard()
    event.cancel()
})

const NearestAttackableTargetGoal = Java.loadClass("net.minecraft.world.entity.ai.goal.target.NearestAttackableTargetGoal")
const LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');

EntityJSEvents.addGoals('darkages:guard', event => {
    event.nearestAttackableTarget(0, LivingEntity, 10, true, false, target => {
        if (isInLawStructure(event.entity)) {
            if (target.type == 'darkages:viking') return true;
        }
        if (!target.isMonster()) return false
        return true
    })
    event.arbitraryTargetGoal(2, /**@param {Internal.PathfinderMob} mob */ mob =>
        new NearestAttackableTargetGoal(mob, $Player, true, /**@param {Internal.Player} target */ target => {
            if (target.isPlayer() && (target.getActiveEffects().toString().includes('crime x 2'))) {
                return true
            }
             else if (target.isPlayer() && (target.getActiveEffects().toString().includes('crime'))) {
                mob.getNavigation().moveTo(target, 1.3)
                if (target.distanceToEntity(mob) < 5) {
                    mob.server.runCommandSilent(`dialog ${target.username} show ${target.username} arrest`)
                    epicfightPatch(target).toMode('vanilla', true)
                    target.removeEffect('darkages:crime')
                    mob.setTarget(null)
                }
                return false
            }
            return false
        })
    );
});
EntityJSEvents.addGoalSelectors("darkages:guard", event => {
    event.customGoal("resetGuardTarget", 1, m => m.target != null, m => m.target != null, true, m => { }, m => { }, true, mob => {
        const { target } = mob
        if (target == null) return

        if (target.isPlayer() && !target.getActiveEffects().toString().includes('crime')) {
            mob.setTarget(null);
        }
    })
})
