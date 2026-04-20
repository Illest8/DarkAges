EntityJSEvents.addGoals('darkages:friar', event => {
    event.arbitraryTargetGoal(2, /**@param {Internal.PathfinderMob} mob */ mob =>
        new NearestAttackableTargetGoal(mob, $Player, true, /**@param {Internal.Player} target */ target => {
            if (target.isPlayer() && (!target.stages.has('start')) && questAvailable(target, '5E75468A9EBEE5A0') && target.distanceToEntity(mob) < 16) {
                mob.getNavigation().moveTo(target, 0.8);

                if (target.distanceToEntity(mob) < 3 ) {

                    target.server.runCommandSilent(`dialog ${target.username} show ${target.username} first_join`);
                    target.stages.add('start');
                    mob.setTarget(null);
                }
                return false;
            }
            return false
        })
    );
});