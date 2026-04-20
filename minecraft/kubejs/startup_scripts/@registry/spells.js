const $HardcoreRevival = Java.loadClass('net.blay09.mods.hardcorerevival.HardcoreRevival')
const $TargetedAreaEntity = Java.loadClass('io.redspace.ironsspellbooks.entity.spells.target_area.TargetedAreaEntity')
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player')
const $TargetAreaCastData = Java.loadClass('io.redspace.ironsspellbooks.spells.TargetAreaCastData')
const $SpellUtils = Java.loadClass('io.redspace.ironsspellbooks.api.util.Utils')
const $TargetEntityCastData = Java.loadClass('io.redspace.ironsspellbooks.capabilities.magic.TargetEntityCastData')
const $CastType = Java.loadClass('io.redspace.ironsspellbooks.api.spells.CastType');

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('darkages:revive')
        .setAllowLooting(false)
        .canBeCraftedBy(() => false)
        .setCastTime(120)
        .setCooldownSeconds(90)
        .setBaseManaCost(100)
        .setManaCostPerLevel(100)
        .setMaxLevel(3)
        .setCastStartAnimation('irons_spellbooks:charge_spit_animation', true, false)
        .setCastFinishAnimation('cast_t_pose', true, false)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(0)
        .setCastType($CastType.LONG)
        .setSchool('irons_spellbooks:holy')
        .setUniqueInfo(lvl => [Component.green(`Revives Downed Players`), Component.green(`${lvl * 5} Block Radius.`)])
        .onPreCast(ctx => {
            if (ctx.playerMagicData == null) return
            let targetedAreaEntity = $TargetedAreaEntity.createTargetAreaEntity(ctx.level, ctx.entity.position(), 5 * ctx.spellLevel, 16776960, ctx.entity)
            ctx.playerMagicData.setAdditionalCastData(new $TargetAreaCastData(ctx.entity.position(), targetedAreaEntity))
        })
        .onCast(ctx => {
            let aabb = ctx.entity.getBoundingBox().inflate(5 * ctx.spellLevel)
            let entities = ctx.level.getEntitiesWithin(aabb)
            let revivalManager = $HardcoreRevival.getManager()
            entities.forEach(entity => {
                if (entity.isMonster() && ctx.entity.persistentData.power == 'farmer') {
                    entity.setSecondsOnFire(7)
                }
                if (entity.isPlayer() && revivalManager.getRevivalData(entity).isKnockedOut()) {
                    revivalManager.wakeup(entity)
                }
            })
        })
})

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('darkages:sap')
        .setAllowLooting(false)
        .canBeCraftedBy(() => false)
        .setCastTime(20)
        .setCooldownSeconds(10)
        .setBaseManaCost(10)
        .setManaCostPerLevel(10)
        .setMaxLevel(5)
        .setCastStartAnimation('charge_black_hole', true, false)
        .setCastFinishAnimation('cast_t_pose', true, false)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(0)
        .setCastType('long')
        .setSchool('irons_spellbooks:nature')
        .setUniqueInfo(lvl => [Component.green(`Reduces target's stamina by ${lvl * 10}%`), Component.green(`${lvl * 5} Block Range`), Component.red(`If target's stamina < ${lvl * 10}%, breaks target's guard.`)])
        .checkPreCastConditions(ctx => global.sapPreCast(ctx))
        .onPreCast(ctx => global.sapPre(ctx))
        .onCast(ctx =>
            global.sap(ctx)
        );
});

global.sapPreCast = ctx => {
    const hit = $SpellUtils.raycastForEntity(ctx.level, ctx.entity, ctx.spellLevel * 5, true);
    if (!hit || !hit.entity || !hit.entity.isLiving()) return false;

    const patch = $EpicFightCapabilities.getEntityPatch(hit.entity, LivingData);
    if (!patch) ctx.entity.displayClientMessage(Text.red('Entity does not have stamina!'), true)
    const stamina = patch.getMaxStamina()
    if (!patch || !stamina) return false;

    return ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, 48, 0.35)
};

global.sapPre = ctx => {
    const hit = $SpellUtils.raycastForEntity(ctx.level, ctx.entity, ctx.spellLevel * 5, true);
    $TargetedAreaEntity.createTargetAreaEntity(ctx.level, hit.entity.position(), 1, 1, hit.entity);
    ctx.playerMagicData.setAdditionalCastData(new $TargetEntityCastData(hit.entity));
};

global.sap = ctx => {
    const castData = ctx.playerMagicData.getAdditionalCastData();
    if (!castData || !castData.getTargetUUID) return;

    const target = ctx.level.getEntity(castData.getTargetUUID());
    if (!target || !target.isLiving()) return;

    const patch = $EpicFightCapabilities.getEntityPatch(target, LivingData);
    if (!patch) return;

    const reduction = patch.getMaxStamina() * (ctx.spellLevel * 0.1);
    const newStamina = patch.getStamina() - reduction;

    if (newStamina < 0) {
        ctx.level.server.runCommandSilent(
            'execute as ' + target.getStringUuid() + ' run indestructible @s play "epicfight:biped/skill/guard_break1" 0 1'
        );
        patch.setStamina(patch.getMaxStamina());
    } else {
        patch.setStamina(newStamina);
    }
};

// const SpellAnimations = Java.loadClass(
//     'io.redspace.ironsspellbooks.api.spells.SpellAnimations'
// )

// let logged = false;

// ISSEvents.modifySpell(event => {
//     event.modify('irons_spellbooks:devour', spell => {


//         spell.setCastTimeCallback(time => 60)

//         spell.setClientPreCastCallback(false, cb => {
//             if (logged == false) {
//             console.log('Client CALLBACK:')
//             logObject(cb)
//             }
//             return;
//         })

//         spell.setServerPreCastCallback(true, cb => {
//             cb.getPlayerMagicData().
//             if (logged == false) {
//             console.log('Server CALLBACK:')
//             logObject(cb.getPlayerMagicData())
//             logged = true
//             }
//             return;
//             // cb.setAnimation(SpellAnimations.ANIMATION_LONG_CAST)
//         })

//         spell.setCastStartAnimation(SpellAnimations.CHARGE_SPIT_ANIMATION)
//         spell.setCastFinishAnimation(SpellAnimations.SPIT_FINISH_ANIMATION)

//         spell.setPreCastConditionsCallback((player, spellInstance) => {
//             return true
//         })
//     })
// })

/*
ANIMATION_CHARGED_CAST
ANIMATION_CONTINUOUS_CAST
ANIMATION_RESOURCE
BOW_CHARGE_ANIMATION
ANIMATION_LONG_CAST
ANIMATION_CONTINUOUS_OVERHEAD
ANIMATION_CONTINUOUS_CAST_ONE_HANDED
ANIMATION_LONG_CAST_FINISH
CAST_KNEELING_PRAYER
ANIMATION_INSTANT_CAST
OVERHEAD_MELEE_SWING_ANIMATION
CHARGE_WAVY_ANIMATION
CAST_T_POSE
FINISH_ANIMATION
SLASH_ANIMATION
CHARGE_SPIT_ANIMATION
CHARGE_RAISED_HAND
SELF_CAST_ANIMATION
SPIT_FINISH_ANIMATION
THROW_SINGLE_ITEM
SELF_CAST_TWO_HANDS
TOUCH_GROUND_ANIMATION
CHARGE_ANIMATION
ONE_HANDED_HORIZONTAL_SWING_ANIMATION
ONE_HANDED_VERTICAL_UPSWING_ANIMATION
PREPARE_CROSS_ARMS
STOMP
 */

// StartupEvents.registry('irons_spellbooks:spells', event => {
//     event.create('darkages:home')
//         .setAllowLooting(false)
//         .canBeCraftedBy(() => false)
//         .setCastTime(200)
//         .setCooldownSeconds(90)
//         .setBaseManaCost(100)
//         .setManaCostPerLevel(100)
//         .setMaxLevel(1)
//         .setCastStartAnimation('charge_wavy', true, false)
//         .setCastFinishAnimation('charge_wavy', true, false)
//         .setBaseSpellPower(1)
//         .setSpellPowerPerLevel(0)
//         .setCastType('long')
//         .setSchool('irons_spellbooks:holy')
//         .checkPreCastConditions(ctx => {
//             let totem = ctx.entity.getMainHandItem().nbt.TotemCoordinates || [{}]
//             if (!totem) return false;
//             return true;
//         })
//         .onCast(ctx => {
//             let totem = ctx.entity.getMainHandItem().nbt.TotemCoordinates || [{}]
//             totem.forEach(claim => {
//                 if (ctx.level.getBlock(claim.x, claim.y, claim.z) != 'furtotemsmod:upgradable_totem') {
//                     ctx.entity.tell(Text.of('No Claim Found').red())
//                     ctx.entity.getMainHandItem().nbt.remove('TotemCoordinates')
//                     return;
//                 }
//                 ctx.level.runCommandSilent(`tp ${ctx.entity.username} ${claim.x} ${claim.y} ${claim.z}`)
//             })
//         })
// })