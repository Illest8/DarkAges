let portalData = {
  orc: {
    action: (block, server, player) => {
      server.runCommandSilent(`open_gateway ${block.getX()} ${block.getY() + 2} ${block.getZ()} darkages:gateways/orcs`)
      server.runCommandSilent(`execute at ${player.username} run playsound minecraft:block.enchantment_table.use neutral @a[distance=..10]`)
      server.runCommandSilent(`execute positioned ${block.x} ${block.y} ${block.z} run respawningstructures setClosestStructureRespawningFlag true`)
      block.set('air')
    }
  },
  veilkeeper: {
    action: (block, server, player) => {
      server.runCommandSilent(`summon darkages:veilkeeper ${block.getX()} ${block.getY() + 2} ${block.getZ()}`)
      server.runCommandSilent(`execute at ${player.username} run playsound minecraft:block.enchantment_table.use neutral @a[distance=..10]`)
      server.runCommandSilent(`execute at ${player.username} run playsound darkages:veilkeeper_laugh neutral @a[distance=..10]`)
      block.set('air')
    }
  },
  eroded_castle: {
    action: (block, server, player) => {
      server.runCommandSilent(`open_gateway ${block.getX()} ${block.getY() + 2} ${block.getZ()} darkages:gateways/eroded_castle`)
      server.runCommandSilent(`execute at ${player.username} run playsound minecraft:block.enchantment_table.use neutral @a[distance=..10]`)
      block.set('air')
    }
  }
}

BlockEvents.rightClicked(event => {
  const { block, hand, server, player } = event
  if (block.id !== 'darkages:statue_sword') return
  if (hand !== 'main_hand') return

  const portalType = block.getEntityData().ForgeData.Portal
  const portal = portalData[portalType]
  if (portal) {
    portal.action(block, server, player)
  }
})