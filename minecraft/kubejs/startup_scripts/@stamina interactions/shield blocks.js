ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingAttackEvent", event => {
  try {
    let entity = event.entity
    let patch = $EpicFightCapabilities.getEntityPatch(entity, LivingData)

    if (entity.type == 'minecraft:player') {
      if (entity.isBlocking()) {
        let currentStamina = patch.getStamina()
        let damage = event.getAmount()

        let proficiencyLevel = entity.getAttributeValue('darkages:blocking') || 0
        let multiplier = 1 / (1 + (proficiencyLevel * 0.1))
        let staminaCost = damage * multiplier

        if (staminaCost > currentStamina) {
          patch.applyStun('short', 200)
          patch.setStamina(currentStamina / 2)
          return
        }
        
        patch.setStamina(currentStamina - staminaCost)
        patch.resetActionTick()
        patch.toEpicFightMode(true)
      }
    }
  } catch (error) {
    console.error(error)
  }
})
