ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal("dumpinv")
      .executes(ctx => {
        try {
          let p = ctx.source.player;

          let items = []
          for (let i = 0; i < p.inventory.getContainerSize(); i++) {
            let stack = p.inventory.getItem(i)
            if (!stack.empty) {
              items.push(stack.item.id)
            }
          }

          let jsonContent = {
            player: p.username,
            timestamp: Date.now(),
            inventory: items
          }

          JsonIO.write("kubejs/config/player-inventory.json", jsonContent)

          p.tell("§aInventory dumped to config/player-inventory.json")
          return 1
        } catch (err) {
          console.log("[DumpInv] ERROR:", err)
          return 0
        }
      })
  )
})