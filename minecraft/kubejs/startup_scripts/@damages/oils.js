ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingAttackEvent', event => {
  const { player } = event.source;
  let target = event.entity;
  if (!player) return;

  if (hasEntityTag(target, 'darkages:mobs/bosses')) return;

  let playerPatch = $EpicFightCapabilities.getEntityPatch(player, LivingData)
  let targetPatch = $EpicFightCapabilities.getEntityPatch(target, LivingData)

  let item = player.getMainHandItem();
  let nbt = item.nbt;

  if (nbt?.Oils) {
    let uses = nbt.Oils[0].Uses;

    let Oil = nbt.Oils[0].Oil
    if (!Oil) return;
    // player.tell(Oil)
    if (Oil == 'Restore' && hasEntityTag(target, 'darkages:mobs/hostile_humans')) {
      target.potionEffects.add('footwork:paralysis', 60, 1, true, true)
    }
    else if (Oil == 'Empowered' && player.isCrouching()) {
      player.potionEffects.add('minecraft:strength', 200, 0, true, false)
    }
    else if (Oil == 'Echo' && !player.hasEffect('irons_spellbooks:echoing_strikes')) {
      player.potionEffects.add('irons_spellbooks:echoing_strikes', 200, 0, true, false)
    }
    else if (Oil == 'Beast') {
      if (!target.onGround()) {
        setDamage(target, 3)
        // target.teleportTo(target.x, target.y + 1, target.z)
        // target.potionEffects.add('minecraft:slow_falling', 40, 10, true, false);
        // return;
      }
      // console.log(Object.keys(target))
      // target.initiateCastSpell('irons_spellbooks:heartstop', 1)
      target.teleportTo(target.x, target.y + 1, target.z)
      target.potionEffects.add('minecraft:slow_falling', 40, 10, true, false);
    }
    else if (Oil == 'Terror') {
      aoeDamage(target, 8, player.getAttributeValue('generic.attack_damage'))
    }
    else if (Oil == 'Siphon' && (playerPatch.getStamina() != playerPatch.getMaxStamina() || !isFullHealth(player))) {
      playerPatch.setStamina(playerPatch.getStamina() + (playerPatch.getMaxStamina() * 0.3))
      player.heal(player.getMaxHealth() * 0.3)
      setDamage(target, 10);
    }
    else if (Oil == 'Ravage' && !isFullHealth(player)) {
      setDamage(target, Math.round(player.getMaxHealth() - player.health))
    }
    else if (Oil == 'Halo' && target.isOnFire() && !target.hasEffect('attributeslib:sundering')) {
      target.extinguishFire()
      target.potionEffects.add('attributeslib:sundering', 100, 0, true, true)
    }
    else if (Oil == 'Rampage' && !player.hasEffect('epicfight:stun_immunity')) {
      player.potionEffects.add('epicfight:stun_immunity', 200, 0, true, false)
    }
    else if (Oil == 'Venom' && !target.hasEffect('minecraft:poison') && (hasEntityTag(target, 'darkages:mobs/hostile_humans') || target.isPlayer())) {
      target.potionEffects.add('minecraft:poison', 100, 0, true, false)
    }
    else if (Oil == 'Parity' && hasEntityTag(target, 'darkages:mobs/monsters') && !isFullHealth(player)) {
      player.heal(5)
    }
    else if (Oil == 'Judgement' && !target.hasEffect('irons_spellbooks:heartstop')) {
      target.potionEffects.add('irons_spellbooks:heartstop', 600, 0, true, false)
      target.persistentData.baseDamage = target.getAttributeValue('generic.attack_damage')
      target.setAttributeBaseValue('generic.attack_damage', (target.persistentData.baseDamage * 0.95) - target.persistentData.baseDamage)
      player.server.scheduleInTicks(600, callback => {
        target.setAttributeBaseValue('generic.attack_damage', target.persistentData.baseDamage)
      })
    }
    else if (Oil == 'Revenant') {
      if (!target.persistentData.revenantStacks) {
        target.persistentData.revenantStacks = 1
        player.setStatusMessage(` \uE001 1`)
        player.server.scheduleInTicks(100, callback => {
          // target.attack(target.level.damageSources().generic(), target.persistentData.revenantStacks * 5)
          setDamage(target, target.persistentData.revenantStacks * 5)
          delete target.persistentData.revenantStacks
        })
      }
      else {
        target.persistentData.revenantStacks = target.persistentData.revenantStacks + 1
        player.setStatusMessage(` \uE001 ${target.persistentData.revenantStacks}`)
        return;
      }
    }
    else return;

    if (uses <= 1) {
      item.nbt.remove('Oils')
    } else {
      nbt.Oils[0].Uses = uses - 1;
      item.nbt = nbt;
      // player.tell(`Remaining uses: ${nbt.Oils[0].Uses}`);
    }
  }
});

function setDamage(target, amount) {
  return target.attack(target.level.damageSources().generic(), amount)
}

function aoeDamage(target, distance, amount) {
  target.level.getEntitiesWithin(target.getBoundingBox().inflate(distance)).forEach(entity => {
    if (entity.type == target.type) { setDamage(entity, amount) }
  })
}

function isFullHealth(entity) {
  if (entity.health != entity.getMaxHealth()) {
    return false
  }
  return true
} 

function hasEntityTag(target, tagLocation) {
  return target.entityType.tags.anyMatch(tag => tag.location() == tagLocation);
}