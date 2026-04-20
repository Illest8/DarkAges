const $ClientLivingHurtEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingHurtEvent');
const $EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot');
const $Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes');

NativeEvents.onEvent($EventPriority.LOW, true, $ClientLivingHurtEvent, event => {
  let attacker = event.source.player ||
                 event.source.immediate ||
                 event.source.actual;

  let victim = event.entity;

  if (!(attacker instanceof $Player) && !(victim instanceof $Player)) return;

  let chest = victim.getChestArmorItem();
  let sound = 'darkages:flesh_hit';

  if (!chest.isEmpty()) {
    let modifiers = chest.getAttributeModifiers($EquipmentSlot.CHEST);
    let armorList = modifiers.get($Attributes.ARMOR);

    if (armorList) {
      for (let mod of armorList) {
        sound = mod.getAmount() > 5
          ? 'darkages:heavy_armor_hit'
          : 'darkages:light_armor_hit';
        break;
      }
    }
  }

  if (attacker instanceof $Player)
    attacker.sendData('darkages:sound', { sound: sound, category: 'master' });

  if (victim instanceof $Player)
    victim.sendData('darkages:sound', { sound: sound, category: 'master' });
});