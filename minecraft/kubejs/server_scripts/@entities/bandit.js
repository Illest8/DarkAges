

EntityJSEvents.addGoalSelectors('darkages:bandit', event => {
    if (event.entity.level.isClientSide()) return;

    let id = event.entity.mainHandItem.id
    if (!id.includes('bow')) return;

    event.arbitraryGoal(1, e => {
        let goal = new $RangedAttack(e, 1.0, 40, 15.0);
        return goal;
    });
});

// EntityJSEvents.addGoalSelectors('darkages:bandit', e => {
//     e.customGoal(
//         'raid_travel_west',
//         0,
//         mob => mob.tags.contains('raidEast'),
//         mob => mob.tags.contains('raidEast'),
//         true,
//         mob => {
//             const targetX = mob.persistentData.spawnX - 60;
//             mob.persistentData.targetX = targetX;
//             mob.getNavigation().moveTo(targetX, mob.y, mob.z, 1.0);
//         },
//         mob => {
//             mob.getNavigation().stop();
//             mob.removeTag('raidEast');
//         },
//         true,
//         mob => {
//             if (mob.age % 40 !== 0) return;

//             const targetX = mob.persistentData.targetX;
//             if (mob.x <= targetX) {
//                 mob.removeTag('raidEast');
//                 return;
//             }

//             mob.getNavigation().moveTo(targetX, mob.y, mob.z, 1.0);
//         }
//     );
// });