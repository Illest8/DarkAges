const $Screen = Java.loadClass('net.minecraft.client.gui.screens.Screen');
NativeEvents.onEvent($EventPriority.LOW, true, $ScreenOpen, event => {
  const screen = event.getScreen();
  if (!screen) return;

  const name = screen.getClass().getName();
  // console.log(name)

  if (name === "top.yourzi.dialog.ui.DialogScreen") {
    Client.soundManager.stop
    Client.player.sendData('dialog_open', { open: true })
  }
});

// const $ClientEffect = Java.loadClass('net.minecraftforge.event.entity.living.MobEffectEvent');
// NativeEvents.onEvent($EventPriority.LOW, true, $ClientEffect, event => {
//   if (!event.entity.player) return;
//   let player = Client.player;
//   let effects = player.getActiveEffects()
//   let diseases = []
//   effects.forEach(effect => {
//     if (!effect.effect.beneficial) {
//       diseases.push(effect.effect.getDisplayName().getString())
//     }
//   })
//   $VariableHandler.setVariable('diseases', diseases.join('\n\n'))
// })

// const $ClientEffectRemoved = Java.loadClass('net.minecraftforge.event.entity.living.MobEffectEvent$Remove');

// NativeEvents.onEvent($EventPriority.LOWEST, true, $ClientEffectRemoved, event => {
//     if (!event.entity.player) return;
//     if (!event.getEffect().beneficial) {
//         $VariableHandler.setVariable('diseases', null);
//     }
// });