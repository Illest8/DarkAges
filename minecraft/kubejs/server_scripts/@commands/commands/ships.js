global.ShipUtils = {
  getId(st) {
    try {
      if (st.id) return String(st.id)
      if (st.getString) return st.getString("id")
    } catch (err) {
      console.log("[ShipUtils] getId error:", err)
    }
    return "unknown_item"
  },
  getCount(st) {
    try {
      if (typeof st.Count !== "undefined") return Number(st.Count)
      if (st.getInt) return st.getInt("Count")
      if (st.getByte) return st.getByte("Count")
    } catch (err) {
      console.log("[ShipUtils] getCount error:", err)
    }
    return 0
  },
  setCount(st, value) {
    try {
      st.Count = value
    } catch (err) {
      console.log("[ShipUtils] setCount error:", err)
    }
  }
}

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  event.register(
    Commands.literal('ship')
      .then(
        Commands.argument('item', Arguments.ITEM_STACK.create(event))
          .then(
            Commands.argument('action', Arguments.STRING.create(event))
              .then(
                Commands.argument('count', Arguments.INTEGER.create(event))
                  .executes(ctx => {
                    try {
                      let p = ctx.source.player
                      if (!p) {
                        console.log("[ShipCmd] No player context")
                        return 0
                      }

                      let itemStack = Arguments.ITEM_STACK.getResult(ctx, 'item')
                      let itemId
                      if (itemStack.item && itemStack.item.id) {
                        itemId = itemStack.item.id
                      } else if (itemStack.getItem) {
                        itemId = itemStack.getItem().id
                      } else {
                        itemId = String(itemStack)
                      }

                      let action = Arguments.STRING.getResult(ctx, 'action')
                      let count = Arguments.INTEGER.getResult(ctx, 'count')

                      // === Find nearest owned ship ===
                      let all = p.level.getEntitiesWithin(p.boundingBox.inflate(200))
                      let ships = all.filter(e => {
                        if (e.type != "smallships:cog") return false
                        let nbt = e.getNbt()
                        if (!nbt || !nbt.CustomName) return false
                        try {
                          let nameObj = JSON.parse(nbt.CustomName)
                          return nameObj.text === p.username
                        } catch (_) {
                          return false
                        }
                      })

                      if (ships.length === 0) {
                        p.tell("§cNo owned ship nearby.")
                        return 1
                      }

                      let ship = ships[0]
                      let nbt = ship.getNbt()
                      let items = Array.isArray(nbt.Items) ? nbt.Items : []

                      if (action === "withdraw") {
                        let stack = items.find(st => global.ShipUtils.getId(st) === itemId)
                        if (!stack) {
                          p.tell(`§cNo ${itemId} in ship.`)
                          return 1
                        }

                        let stackCount = global.ShipUtils.getCount(stack)
                        if (stackCount < count) {
                          p.tell(`§cNot enough ${itemId} in ship.`)
                          return 1
                        }

                        global.ShipUtils.setCount(stack, stackCount - count)
                        if (global.ShipUtils.getCount(stack) <= 0) {
                          // rebuild array without this stack
                          items = items.filter(st => st !== stack)
                        }

                        nbt.Items = items
                        ship.mergeNbt(nbt)

                        p.give(Item.of(itemId, count))
                        p.tell(`§aWithdrew ${count} ${itemId} from ship.`)

                      } else if (action === "deposit") {
                        // check player has enough
                        if (p.inventory.count(itemId) < count) {
                          p.tell(`§cYou don’t have ${count} ${itemId}.`)
                          return 1
                        }

                        // find the slot and extract
                        let slot = p.inventory.find(itemId)
                        if (slot < 0) {
                          p.tell(`§cCould not find ${itemId} in your inventory.`)
                          return 1
                        }

                        // actually remove the items
                        let extracted = p.inventory.extractItem(slot, count, false)
                        console.log("[ShipCmd] Extracted from inventory:", extracted)

                        // add to ship inventory
                        let stack = items.find(st => global.ShipUtils.getId(st) === itemId)
                        if (stack) {
                          let stackCount = global.ShipUtils.getCount(stack)
                          global.ShipUtils.setCount(stack, stackCount + count)
                        } else {
                          items.push({ id: itemId, Count: count, Slot: items.length })
                        }

                        nbt.Items = items
                        ship.mergeNbt(nbt)

                        p.tell(`§aDeposited ${count} ${itemId} into ship.`)
                      } else {
                        p.tell("§cAction must be 'deposit' or 'withdraw'.")
                      }

                      return 1
                    } catch (err) {
                      console.log("[ShipCmd] ERROR:", err)
                      return 0
                    }
                  })
              )
          )
      )
  )
})