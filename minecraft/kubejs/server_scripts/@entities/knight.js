
EntityJSEvents.addGoals('darkages:knight', event => {
    event.nearestAttackableTarget(0, LivingEntity, 10, true, false, target => {
        if (isInLawStructure(event.entity)) {
            if (target.type == 'darkages:viking') return true;
        }
        if (!target.isMonster()) return false
        return true
    })
    event.arbitraryTargetGoal(2, /**@param {Internal.PathfinderMob} mob */ mob =>
        new NearestAttackableTargetGoal(mob, $Player, true, /**@param {Internal.Player} target */ target => {
            if (target.isPlayer() && (target.persistentData.reputation < -100)) {
                return true
            }
            return false
        })
    );
});
// Reset target if crime effect is gone
// EntityJSEvents.addGoalSelectors("darkages:guard", event => {
//     event.customGoal("resetGuardTarget", 1, m => m.target != null, m => m.target != null, true, m => { }, m => { }, true, mob => {
//         const { target } = mob
//         if (target == null) return

//         if (target.isPlayer() && !target.) {
//             mob.setTarget(null);
//         }
//     })
// })
