EntityEvents.death(event => {
  if (event.entity.nbt.Owner) {
    if (event.source.actual.nbt.UUID.toString().includes(event.entity.nbt.Owner.toString())) {
      event.server.runCommandSilent(`summon item ${event.entity.x + 0.5} ${event.entity.y + 1} ${event.entity.z + 0.5} {Item:{id:"darkages:soul_of_innocence",Count:1}}`)
    }
  }
  return;
})