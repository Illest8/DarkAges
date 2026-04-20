EntityJSEvents.addGoals('darkages:bladesworn', event => {
    event.nearestAttackableTarget(0, LivingEntity, 10, true, false, target => {
        if (target.isMonster() || target.type == 'darkages:bladesworn') return false
        return true
    })
});
