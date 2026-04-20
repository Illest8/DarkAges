// ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteractSpecific', event => {
//     let player = event.getEntity();
//     let target = event.getTarget();
//     if (!player || !target) return;

//     // let isPlayerCombat = player.getCombatTracker().inCombat;
//     let isTargetCombat = target.getCombatTracker().inCombat;

//     if (isTargetCombat) {
//         player.tell(Text.red(`${target.getName().getString()} is in combat.`));
//     }
// });