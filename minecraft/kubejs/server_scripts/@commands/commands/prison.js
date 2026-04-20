function teleportNextTick(player, pos) {
  const x = Number(pos.x) + 0.5;
  const y = Number(pos.y);
  const z = Number(pos.z) + 0.5;

  player.teleportTo(x, y, z);
}

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal('prison')
      .requires(s => s.hasPermission(2))
      .executes(c => {
        try {
          let player = c.source.entity;
          if (!player || !player.isPlayer()) {
            console.log((Text.of('This command must be run by a player').yellow(), true));
            return 0;
          }

          resetSkillCategoryProgress(player, 'darkages:darkages');

          let handler = getCurioSlot(player, 'back');

          if (!handler) {
            console.log(`No back slot on ${player.username}.`);
          } else {
            let stacks = handler.getStacks();
            let stack = stacks.getStackInSlot(0);

            if (!stack.isEmpty()) {
              removeStolenFromItemStack(stack, player);
              stacks.setStackInSlot(0, stack);
            }
          }

          for (let i = 0; i < player.inventory.getContainerSize(); i++) {
            let stack = player.inventory.getItem(i);
            if (stack.empty) continue;

            if (stack.id.includes('travelersbackpack:') && stack.nbt) {
              let items = stack.nbt.Inventory.Items;
              items.forEach(item => {
                if (item.tag?.Stolen) {
                  item.id = 'minecraft:air';
                  item.Count = 0;
                  delete item.tag;
                }
              });
            }

            let nbt = stack.nbt ?? {};
            if (nbt.Stolen === 1) {
              player.inventory.setItem(i, Item.of('minecraft:air'));
            }
          }

          if (getTown(player)) {
            for (let building of getTownBuildings(player)) {
              if (building.getType().toLowerCase() === 'keep') {
                let center = building.getSourceBlock();
                player.setInvulnerable(true)
                player.teleportTo(center.x, center.y - 10, center.z)
                player.setInvulnerable(false)
                addHeartsToAllResidents(player, -3);
                return 1;
              }
            }
          }

          let spawn = c.source.server.persistentData.prisonSpawn;
          if (!spawn) {
            player.tell('No prison spawn');
            return 0;
          }

          else {
            teleportNextTick(player, spawn);
          }
          return 1;
        } catch (err) {
          console.log(err)
        }
      })
  );
});