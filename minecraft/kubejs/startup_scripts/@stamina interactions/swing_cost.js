
// ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingAttackEvent', event => {
//   const { amount, source: { player }, entity } = event;
//   if (!player) return;

//   if (event.source != 'DamageSource (player)') return;

//   if (entity.nbt.Owner) {
//     if (entity.nbt.Owner == player.getUuid()) {
//       event.setCanceled(true);
//     }
//   }

//   let swingCost = 0;

//   let entityPatch = $EpicFightCapabilities.getEntityPatch(player, LivingData);
//   if (!entityPatch) {
//     return;
//   }

//   // logObject(entityPatch.target)

//   let currentStamina = entityPatch.getStamina();
//   let maxStamina = entityPatch.getMaxStamina();
//   let mainItem = player.getMainHandItem();

//   let swingCostAttr = $Registry.ATTRIBUTE.get(new $ResourceLocation('darkages', 'swing_cost'));
//   let modifier = mainItem.getAttributeModifiers('mainhand')
//   let iter = modifier.get(swingCostAttr).iterator()
//   while (iter.hasNext()) {
//     swingCost += iter.next().getAmount();
//   }

//   if (currentStamina > swingCost) {
//     entityPatch.setStamina(currentStamina - swingCost);
//     return;
//   }

//   else {
//     if (player.hasEffect('epicfight:stun_immunity')) return;
//     entityPatch.applyStun('LONG', 1)
//   }
// });

function logObject(logItem) {
  return console.log(Object.keys(logItem))
}