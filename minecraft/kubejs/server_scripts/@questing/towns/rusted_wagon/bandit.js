LootJS.modifiers(event => {
  event.addEntityLootModifier('darkages:bandit')
    .entityPredicate(bandit => String(bandit.getDisplayName()).includes('Leader'))
    .apply(action => {
      let player = action.player;
      if (!player) return;
      if (questCompleted(player, '010B7965B6E5B186')) return;
      if (isInStructure(player, 'darkages:overworld/bandit_captured_fort') && questCompleted(player, '370C8ECBD71B488E')) {
        completeQuest(player, '010B7965B6E5B186')
        let rarities = $RarityRegistry.INSTANCE.getOrderedRarities();
        let common = rarities.get(1).value();
        let uncommon = rarities.get(2).value();

        action.addLoot(LootEntry.of('book'))

        for (let i = 0; i < action.loot.size(); i++) {
          let loot = action.loot.get(i);
          let category = $LootCategory.forItem(loot.id);
          if (category == $LootCategory.NONE) continue;

          let rarity = Math.random() < 0.5 ? common : uncommon;
          let lootItem = $LootController.createLootItem(loot.id, rarity, player.level.random);

          action.loot.set(i, lootItem);
        }
      }
    });
});