
EntityJSEvents.addGoalSelectors('mca:female_villager', event => {
    if (isInLawStructure(event.entity)) {
        event.avoidEntity(0, LivingEntity, e => (e.type == 'darkages:viking' || e.type == 'cataclysm:draugr')  && e.distanceToEntity(event.entity) < 5, 20, 1, 0.6, e => true)
    }
});

EntityJSEvents.addGoalSelectors('mca:male_villager', event => {
    if (isInLawStructure(event.entity)) {
        event.avoidEntity(0, LivingEntity, e => (e.type == 'darkages:viking' || e.type == 'cataclysm:draugr') && e.distanceToEntity(event.entity) < 5, 20, 1, 0.6, e => true)
    }
});