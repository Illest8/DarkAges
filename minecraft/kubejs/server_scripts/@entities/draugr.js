
EntityJSEvents.addGoals('cataclysm:draugr', event => {
    event.nearestAttackableTarget(0, LivingEntity, 10, true, false, target => {
        if (target.type == 'darkages:knight' || target.type == 'minecraft:player') return true
        return false
    })
});