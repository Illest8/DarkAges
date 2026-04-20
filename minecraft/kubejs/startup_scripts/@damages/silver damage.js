ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
  const { amount, source: { player }, entity } = event
  if (!player) return
  if (event.source != 'DamageSource (player)') return;
  if (entity.entityType.tags.anyMatch(tag => tag.location() == 'darkages:mobs/monsters')) {
    if (!player.getMainHandItem().tags.anyMatch(tag => tag.location() == 'darkages:silver_weapons')) {
      event.setAmount(amount / 2)
      return;
    }
    else event.setAmount(amount * 2)
  }
})