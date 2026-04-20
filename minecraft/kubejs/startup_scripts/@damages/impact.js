ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
  const { source: { player }, entity } = event
  if (!player) return
  if (event.source != 'DamageSource (player)') return
  if (entity.hasEffect('epicfight:stun_immunity')) return

  const entityPatch = $EpicFightCapabilities.getEntityPatch(entity, LivingData)
  if (!entityPatch) return

  // -----------------------------
  // 1. Gather attacker/defender stats
  // -----------------------------
  const impact = player.getAttributeValue('epicfight:impact')
  const armorShred = player.getAttributeValue('attributeslib:armor_shred')
  const armor = entity.getAttributeValue('minecraft:generic.armor')
  const knockback = player.getAttributeValue('generic.attack_knockback')

  // -----------------------------
  // 2. Flat penetration from impact
  //    (1 impact = 4 armor removed, capped at 80% of armor)
  // -----------------------------
  const maxFlatPen = armor * 0.8
  const flatPen = Math.min(maxFlatPen, impact * 4)
  const armorAfterImpact = armor - flatPen

  // -----------------------------
  // 3. Percentage penetration from armor negation
  // -----------------------------
  let effectiveArmor = armorAfterImpact * (1 - armorShred)
  if (effectiveArmor < 0) effectiveArmor = 0

  // -----------------------------
  // 4. Stun thresholds
  // -----------------------------
  const shortThreshold = effectiveArmor
  const longThreshold = effectiveArmor * 2

  //player.tell(`Impact: ${impact.toFixed(2)} | Armor: ${armor} | FlatPen: ${flatPen} |  EffArmor: ${effectiveArmor.toFixed(2)}  |  ShortTh: ${shortThreshold.toFixed(2)}`)

  // -----------------------------
  // 5. Stun logic
  // -----------------------------
  const $EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot');

  if (impact > shortThreshold) {
    if (impact > longThreshold) {
      // let random = Math.random();
      // if (random < 0.5) {
      //   // entityPatch.applyStun('knockdown', 5);
      //   // entity.setItemSlot($EquipmentSlot.MAINHAND, 'air')
      //   player.level.playSound(null, entity.x, entity.y, entity.z, 'darkages:charged_swing', 'neutral', 1, 1);
      // }
      // player.server.runCommandSilent(`epicfight animator play ${entity.stringUuid} epicfight:biped/combat/hit_long`)
      entityPatch.applyStun('long', 2);
      pushAway(entity, player, knockback);
      return;
    }

    entityPatch.applyStun('short', 0.1);
    pushAway(entity, player, knockback);
    return;
  }
})

/**
 * @param {Internal.Entity_} target
 * @param {Internal.Entity_ | {x:number,y:number,z:number}} source
 * @param {number} speed
 */
function pushAway(target, source, knockback) {
  // 1. Get positions
  const sx = source.x ?? source.getX();
  const sy = source.y ?? source.getY();
  const sz = source.z ?? source.getZ();

  // 2. Direction from attacker → target
  const dir = new Vec3d(
    target.x - sx,
    0, // keep horizontal knockback clean
    target.z - sz
  ).normalize();

  // 3. Convert knockback attribute into meaningful force
  const force = 0.4 + (knockback * 0.6);

  // 4. Apply velocity
  const velocity = new Vec3d(
    dir.x() * force,
    0.1 + (knockback * 0.05), // small hop feels good, optional
    dir.z() * force
  );

  target.setDeltaMovement(velocity);
}