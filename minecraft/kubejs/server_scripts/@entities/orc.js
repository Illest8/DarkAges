EntityJSEvents.addGoalSelectors("darkages:orc", event => {
    event.customGoal("resetOrcTarget", 0, m => m.target != null, m => m.target != null, true, m => { }, m => { }, true, mob => {
        const { target } = mob
        if (target == null) return

        if (target.isPlayer() && target.getActiveEffects().toString().includes('disguise')) {
            mob.setTarget(null);
        }
    })
})

EntityJSEvents.addGoalSelectors('darkages:orc', event => {
    if (event.entity.level.isClientSide()) return;

    let id = event.entity.mainHandItem.id
    if (!id.includes('bow')) return;

    event.arbitraryGoal(0, e => {
        let goal = new $RangedAttack(e, 1.0, 40, 15.0);
        return goal;
    });
})