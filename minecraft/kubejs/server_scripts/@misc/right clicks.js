

ItemEvents.entityInteracted(event => {
  let { target, entity } = event;

  if (target.type !== 'dragnlivestock:covered_wagon') return;
  if (!target.entityData) return;

  let ownerIntArray = target.nbt.owner;
  if (!ownerIntArray) return;
  let ownerUuid = intArrayToUuid(ownerIntArray);

  if (ownerUuid !== entity.uuid) {
    entity.tell(Text.red(`You don't own this. (Owner: ${ownerUsername})`))
    event.cancel()
  }
});

let decorations = Ingredient.of(/decoration/).itemIds.toArray();

ItemEvents.rightClicked('darkages:decoration_bag', event => {
    let { player, item } = event;

    if (!player.getInventory().getFreeSlot()) {
        player.tell(Text.red("You need at least one free inventory slot"));
        event.cancel();
        return;
    }

    let randomId = decorations[Math.floor(Math.random() * decorations.length)];

    player.give(randomId);

    item.count--;

    player.playSound("minecraft:item.bundle.insert");
});

ItemEvents.rightClicked(event => {
  let item = event.item;
  let player = event.player;
  if (item.id != 'darkages:contract') return;

  let nbt = item.nbt;

  if (nbt && nbt.Contract) {
    const c = nbt.Contract;

    if (c.x !== undefined && c.y !== undefined && c.z !== undefined) {
      let pos = { x: c.x, y: c.y, z: c.z };

      let building = getTownBuilding(player, pos);

      if (building == false) {
        player.tell(Text.darkGray('No building found.').italic())
      }

      if (building.getId() == playerKey(player)) {
        player.tell(Text.darkGray('You are the owner of this building.').italic());
        createWaypoint(player, capitalize(building.type), building.center, 'FFAA00')
        return;
      }

      if (building) {
        building.setId(playerKey(player));

        let typeName = capitalize(building.getType().toString());
        addWaypoint(player, typeName, pos, 'FFFFFF');

        player.tell(`§5You are now the owner of the ${typeName} at §b${pos.x}, ${pos.z}.`);
        return;
      }
    }

    if (c.Town == getTownName(player)) {
      buyHouse(player, c.houseID);
    }

    return;
  }

  // --- LAND CONTRACT ---
  if (item.nbt.toString().includes('land')) {
    player.server.runCommandSilent(`ftbchunks admin extra_claim_chunks ${player.username} add 1`);
    player.tell('You can now claim more land.');
    item.count--;
    return;
  }
});

let podiums = [
  'iceandfire:podium_acacia',
  'iceandfire:podium_birch',
  'iceandfire:podium_dark_oak',
  'iceandfire:podium_jungle',
  'iceandfire:podium_oak',
  'iceandfire:podium_spruce'
]

podiums.forEach(podium => {
  BlockEvents.rightClicked(podium, event => {
    if (event.player.isCreative()) return;
    event.cancel()
  })
})

BlockEvents.rightClicked('overgeared:smithing_anvil', event => {
  const block = event.block
  const player = event.player;
  const nbt = block.getEntityData()

  if (nbt.progress == 0) return;

  if (nbt.progress > 0 && nbt.progress < nbt.maxProgress) {
    nbt.progress += 1
    block.setEntityData(nbt)
    if (player.mainHandItem.id.includes('smithing_hammer')) {
      player.sendData('darkages:sound', {
        sound: 'overgeared:anvil_hit',
        category: 'blocks'
      })
      event.cancel();
      return;
    }
    player.sendData('darkages:sound', {
      sound: 'overgeared:forging_failed',
      category: 'blocks'
    })
    event.cancel()
    return
  }

  if (nbt.progress !== nbt.maxProgress) {
    event.cancel();
    return;
  }
})

BlockEvents.rightClicked('brewing_stand', event => {
  event.player.setStatusMessage(Text.red('Potions are made with Alchemist Cauldrons.').italic())
  event.cancel()
})

ItemEvents.canPickUp('darkages:coin', event => {
  if (!event.item.nbt) return;
  if (event.item.nbt.toString().includes('Stolen')) event.cancel()
})

BlockEvents.leftClicked('create:placard', event => {
  if (!event.player.isCreative()) event.cancel()
})

// let rods = Ingredient.of(/fishing_rod/).itemIds

// rods.forEach(rod => {
// ItemEvents.rightClicked(rod, (event) => {
//   const { player } = event;

//   if (player.fishing) {
//     let { fishing: hook } = player;
//     player.deltaMovement = new Vec3d(hook.x - player.x, hook.y - player.y, hook.z - player.z).scale(0.1);
//     player.hurtMarked = true;
//   }
// });
// })
