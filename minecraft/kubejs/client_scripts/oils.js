

NativeEvents.onEvent($EventPriority.HIGH, true, $MousePressedPre, event => {
  if (event.button !== 1 || !(event.screen instanceof $AbstractContainerScreen)) return;

  const hovered = event.screen.hoveredSlot;
  if (!hovered) return;

  const carried = Client.player.containerMenu.getCarried();
  if (carried.isEmpty()) return;

  const id = String(carried.getItem().id);
  const oilName = vialIdToOilName(id);
  if (!oilName) return;

  event.setCanceled(true);

  const payload = {
    slot: hovered.containerSlot,
    item: hovered.item.id,
    itemNbt: hovered.item.nbt ? hovered.item.nbt.toString() : "{}",
    carriedId: id,
    carriedNbt: carried.nbt ? carried.nbt.toString() : "{}",
    oilName: oilName
  };

  Client.player.sendData("darkages:oil_action", payload);
});

function logObject(object) {
  return console.log(Object.keys(object))
}

function vialIdToOilName(id) {
  if (typeof id !== "string") id = String(id);

  if (!id.startsWith("darkages:") || !id.endsWith("_vial"))
    return null;

  let raw = id.substring("darkages:".length, id.length - "_vial".length);
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}