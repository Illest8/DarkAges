
BlockEvents.rightClicked(event => {
  let player = event.player
  if (event.getHand() == 'off_hand') return;
  if (player.nbt.RootVehicle) return;
  if (event.block.id.toString().includes('stool') || event.block.id.toString().includes('sofa')) {
    player.server.scheduleInTicks(100, () => {
      applyAbsorptionLoop(player)
    })
  }
});

function applyAbsorptionLoop(player) {
    if (!player.nbt.RootVehicle) return;
    if (!player.nbt.RootVehicle.Entity.id) return;

    player.potionEffects.add('minecraft:regeneration', 201), 0, false, true;

    player.server.scheduleInTicks(100, () => {
        applyAbsorptionLoop(player);
    });
}