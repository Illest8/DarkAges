LootJS.modifiers(event => {
  event
    .addLootTypeModifier(LootType.CHEST)
    .apply(action => {
      let player = action.player
      if (!player) return
      if (!isInLawStructure(player)) return
      if (ownedBuilding(player) == true) return;

      action.forEachLoot(loot => {
        if (!loot.nbt) loot.nbt = {}
        loot.nbt.putInt("Stolen", 0)
        return loot
      })

      let aabb = player.getBoundingBox().inflate(20)
      let nearby = player.level.getEntitiesWithin(aabb)
      let witnesses = []

      nearby.forEach(e => {
        if (
          e.type === 'mca:female_villager' ||
          e.type === 'mca:male_villager' ||
          e.type === 'darkages:guard'
        ) {
          if (global.canSeePlayer(e, player)) {
            witnesses.push(e)
          }
        }
      })

      if (witnesses.length > 0) {
        let shouter = witnesses[0]
        player.tell(Text.white(`${shouter.getDisplayName().string}: I saw you stealing!`))

        player.potionEffects.add('darkages:crime', 6000, 0, false, false)

        addResidentHearts(findResidentByName(player, shouter.getDisplayName().string), player, -20)
      }
    })
})

BlockEvents.rightClicked(event => {
  let { player, block } = event
  if (block.id.includes('chest') && block.getEntityData().toString().includes('LootTable')) {
    if (player.hasEffect('darkages:crime')) {
      event.cancel()
    }
  }
})
