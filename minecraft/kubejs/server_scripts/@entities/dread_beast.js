
EntityJSEvents.addGoals('iceandfire:dread_beast', event => {
    event.removeAllGoals()
    event.nearestAttackableTarget(0, LivingEntity, 10, true, false, target => {
        if (target.type == 'darkages:shroud') return false
        return true
    })
});

EntityJSEvents.addGoals('iceandfire:fire_dragon', event => {
    event.removeAllGoals();
    // event.nearestAttackableTarget(0, LivingEntity, 10, false, false, target => {
    //     if (target.isPlayer()) return true
    //     return false
    // })
})

// EntityJSEvents.addGoalSelectors('iceandfire:fire_dragon', event => {

//     const WizardAttackGoal = Java.loadClass('io.redspace.ironsspellbooks.entity.mobs.goals.WizardAttackGoal')
//     let $DragonAIReturnToRoost = Java.loadClass('com.github.alexthe666.iceandfire.entity.ai.DragonAIReturnToRoost');
//     let $DragonAIWander = Java.loadClass('com.github.alexthe666.iceandfire.entity.ai.DragonAIWander');
//     let $DragonAIWatchClosest = Java.loadClass('com.github.alexthe666.iceandfire.entity.ai.DragonAIWatchClosest');

//    event.arbitraryGoal(2, /**@param {Internal.PathfinderMob} mob */ mob =>
//         new NearestAttackableTargetGoal(mob, $Player, true, /**@param {Internal.Player} target */ target => {
//             if (target.isPlayer()) {
//                 return true;
//             }
//             return false
//         })
//     );

    // event.arbitraryGoal(1, dragon => {
    //     return new $DragonAIWander
    // })

//     event.arbitraryGoal(0, (e) => {

//         return new WizardAttackGoal(e, 1.3, 1, 60)
//             .setSpells(
//                 [Spell.of('irons_spellbooks:magma_bomb')],
//                 [Spell.of('irons_spellbooks:slow')],
//                 [Spell.of('irons_spellbooks:blood_step')],
//                 []
//             )
//             .setSpellQuality(1.0, 1.0)
//     })
// })

// const $DragonGroundAttacks = Java.loadClass('com.github.alexthe666.iceandfire.entity.IafDragonAttacks$Ground')
// const $DragonAirAttacks = Java.loadClass('com.github.alexthe666.iceandfire.entity.IafDragonAttacks$Air')

// EntityEvents.spawned('iceandfire:fire_dragon', event => {
//     let dragon = event.entity
//     let AttackGoal = Java.loadClass('com.github.alexthe666.iceandfire.entity.ai.DragonAIAttackMelee')

//     dragon.goalSelector.getAvailableGoals().removeIf(wrapper => {
//         return wrapper.goal instanceof AttackGoal
//     })
// })

// ItemEvents.entityInteracted(event => {
//     let { target, entity } = event;
//     entity.tell('Fired event')
//     // logObject(target)
//     target.goalSelector.getAvailableGoals().forEach(goal => {
//         console.log(goal.goal.toString())
//         // logObject(goal.goal.class)
//         return;
//     })
// })