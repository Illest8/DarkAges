
EntityEvents.hurt(event => {
  if (event.player) return;
  if (event.entity.nbt.isCasting == true) {
    event.entity.server.runCommandSilent(`execute as ${event.entity.uuid} run cast @s counterspell 1`)
    event.getLevel().spawnParticles('cdmoveset:foresight 1 0 0 1', true, event.entity.x, event.entity.y + 1, event.entity.z, 0.3, 0.3, 0.3, 1, 0)
  }
})

EntityEvents.hurt(event => {
    let source = event.source;
    let player = event.entity;

    if (player.type != 'minecraft:player') return;
    if (!source.getType().includes('_magic')) return;

    let skillCap = epicfightPatch(player).getSkillCapability();
    let containers = skillCap.listSkillContainers();

    let isGuarding = false;
    containers.toList().forEach(container => {
      // if (container.isActivated()) {
      //   player.tell(container.getSkill().getCategory())
      // }
        if (container.isActivated()) {
          if (container.getSkill().getCategory() != 'GUARD') return;
            isGuarding = true;
        }
    });

    if (isGuarding) {
      // player.tell('Blocked')
        event.cancel();
    }
});