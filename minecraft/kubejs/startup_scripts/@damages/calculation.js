let blacklistedMobs = [
  'minecraft:phantom'
];

let $Creature = Java.loadClass('net.minecraft.world.entity.ambient.AmbientCreature');
let $Animal = Java.loadClass('net.minecraft.world.entity.animal.Animal');
let $Villager = Java.loadClass('forge.net.mca.entity.VillagerEntityMCA');
let $StealthUtils = Java.loadClass('jackiecrazy.footwork.utils.StealthUtils');
let $Awareness = Java.loadClass('jackiecrazy.footwork.utils.StealthUtils$Awareness');

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
  const { entity, source } = event;

  if (source.getType().includes('magic')) return;
  if (entity instanceof $Creature) return;
  if (entity instanceof $Animal) return;
  if (entity instanceof $Villager) return;

  let player = source.actual && source.actual.isPlayer() ? source.actual : null;
  if (!player) return;

  let dmg = event.amount;

  if (!blacklistedMobs.includes(entity.id)) {
    let awareness = $StealthUtils.INSTANCE.getAwareness(player, entity);
    if (awareness == 'UNAWARE') {
      dmg *= (4/3);

      player.sendData('darkages:sync_variables', { sneak_attack: 1 });
      player.sendData('darkages:sound', { sound: 'darkages:successful_hit', category: 'players' });
    }
  }

  let charged = player.nbt.ForgeData["lzm_epicfight.charged_attack.key.cast"];
  if (charged == 1.0) dmg *= 1.5;

  if (source.actual.getRootVehicle()) dmg *= 2;

  let epicfightMode = getPlayerMode(player);
  if (epicfightMode != 'EPICFIGHT' && source == 'DamageSource (player)') {
    dmg *= 0.5;
  }

  if (entity.persistentData.pvpOff) dmg = 0;

  event.amount = dmg;
});

ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingDamageEvent", event => {
  const { entity, source } = event;
  let player = source.player;
  if (!player) return;

  let finalDamage = event.amount;
  // player.tell(finalDamage);

  if (finalDamage > entity.getMaxHealth() && $StealthUtils.INSTANCE.getAwareness(player, entity) == 'UNAWARE') {
    if (source.getType() === 'player') {
    let id = global.ASSASSINATIONS;
    let stat = Stats.CUSTOM.get(id);
    player.getStats().add(stat, 1);
    }
  }

  let held = player.getMainHandItem().id;
  if (held.includes('torch') || held.includes('sconce')) {
    entity.setSecondsOnFire(3);
  }

  if (player.hasEffect('darkages:disguise')) {
    player.removeEffect('darkages:disguise');
  }
});