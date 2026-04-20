EntityJSEvents.addGoals('darkages:viking', event => {
    event.nearestAttackableTarget(0, LivingEntity, 10, true, false, target => {
        let viking = event.entity;

        if (isInLawStructure(viking)) {
            if (target.type != 'darkages:viking') return true;
        }

        return false;
    });
});

EntityJSEvents.addGoalSelectors('darkages:viking', event => {
    if (event.entity.level.isClientSide()) return;

    let id = event.entity.mainHandItem.id
    if (!id.includes('bow')) return;

    event.arbitraryGoal(0, e => {
        let goal = new $RangedAttack(e, 1.0, 80, 15.0);
        return goal;
    });
});

EntityJSEvents.addGoalSelectors('darkages:viking', e => {
    e.customGoal(
        'raid_travel',
        0,
        mob => !!(mob.persistentData && mob.persistentData.direction),
        mob => !!(mob.persistentData && mob.persistentData.direction),
        true,
        mob => {
            const dir = mob.persistentData.direction;

            let targetX = mob.x;
            let targetZ = mob.z;

            if (dir === "east")  targetX = mob.x - 100;
            if (dir === "west")  targetX = mob.x + 100;
            if (dir === "north") targetZ = mob.z + 100;
            if (dir === "south") targetZ = mob.z - 100;

            mob.persistentData.targetX = targetX;
            mob.persistentData.targetZ = targetZ;

            mob.getNavigation().moveTo(targetX, mob.y, targetZ, 1.0);
        },

        mob => {
            mob.getNavigation().stop();
            delete mob.persistentData.direction;
            delete mob.persistentData.targetX;
            delete mob.persistentData.targetZ;
        },

        true,

        mob => {
            if (mob.age % 60 !== 0) return;

            const tx = mob.persistentData.targetX;
            const tz = mob.persistentData.targetZ;

            const dx = Math.abs(mob.x - tx);
            const dz = Math.abs(mob.z - tz);

            if (dx < 3 && dz < 3) {
                delete mob.persistentData.direction;
                delete mob.persistentData.targetX;
                delete mob.persistentData.targetZ;
                return;
            }

            mob.getNavigation().moveTo(tx, mob.y, tz, 1.0);
        }
    );
});