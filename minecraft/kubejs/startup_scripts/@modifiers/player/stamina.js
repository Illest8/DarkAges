
EntityJSEvents.modifyEntity(event => {
  event.modify('minecraft:player', modifyBuilder => {
    modifyBuilder.tick(player => {

      let patch = $EpicFightCapabilities.getEntityPatch(player, LivingData)
      if (!patch) return

      let current = patch.getStamina()
      let max = patch.getMaxStamina()

      if (player.isBlocking()) return

      if (patch.getStaminaRegenAwaitTicks() > 0) return

      if (current >= max) return

      let temperatureValue = player.getNbt()
        .getCompound('ForgeCaps')
        .getCompound('legendarysurvivaloverhaul:temperature')
        .getInt('temperature')

      let baseRegen = player.getAttributeValue('darkages:stamina_regen') / 40;

      let regen
      if (temperatureValue > 0 && temperatureValue < 11) {
        regen = baseRegen * (temperatureValue / 10)
      } else {
        regen = baseRegen
      }

      let newStamina = Math.min(current + regen, max)
      patch.setStamina(newStamina)
    })
  })
})

// ForgeEvents.onEvent('io.redspace.ironsspellbooks.api.events.SpellPreCastEvent', event => {
//   let player = event.entity
//   if (!player) return;
//   let spellSchool = event.getSchoolType().getDisplayName()
//   console.log(spellSchool)
//   if (spellSchool.string.includes('Blood') && isInLawStructure(player)) {
//     player.tell(Text.red('Warning: Blood magic is illegal in kingdoms and villages.'));
//     player.stages.add('warned');
//     event.cancel();
//   }
// })
// EntityJSEvents.attributes(event => {
//   event.modify('player', attribute => {
//     attribute.add('minecraft:generic.attack_damage', -1)
//   })
// })

// let RenderType = Java.loadClass("net.minecraft.client.renderer.RenderType")
// EntityJSEvents.modifyEntity(event => {
//     event.modify('minecraft:player', modifyBuilder => {
//         modifyBuilder.setRenderType(context => {
//             try {
//                 return global.renderType(context)
//             } catch (error) {
//                 console.log(error)
//                 return null
//             }
//         });
//     })
// })

// /**
//  * 
//  * @param {Internal.ContextUtils$RendererModelContext} context 
//  * @returns 
//  */
// global.renderType = context => {
//   if (context.entity.isCrouching()) {
//     let DefaultPlayerSkin = Java.loadClass("net.minecraft.client.resources.DefaultPlayerSkin")
//     let skin = DefaultPlayerSkin.getDefaultSkin();
//     return RenderType.crumbling(skin)
//   }
//   else return;
// }