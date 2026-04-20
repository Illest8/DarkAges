LootJS.modifiers(event => {
  event.addLootTypeModifier(LootType.CHEST, LootType.ENTITY)
    .apply(action => {

      let player = action.player;
      if (!player) return;

      let level = player.persistentData.level ?? 0;
      let tier = Math.min(40, Math.floor(level / 10) * 10);

      let loot = action.loot;

      loot.forEach(lootItem => {

        let tags = lootItem.tags.toArray();

        tags.forEach(tag => {

          let tagString = tag.location().toString();

          if (!tagString.startsWith("darkages:level_") && $LootCategory.forItem(lootItem != $LootCategory.NONE))
            return;

          console.log('here')

          let stack = Item.of(lootItem).id

          if ($LootCategory.forItem(stack) != $LootCategory.NONE) {

            let rarityItem = applyLevelBasedRarity(lootItem, player, tier/10);

            action.removeLoot(lootItem);
            action.addLoot(rarityItem);

            return;
          }

          let lootItemTier = Number(tagString.split('_')[1]);

          if (level < lootItemTier) {

            let newTag = `darkages:level_${tier}`;

            let newItem = Ingredient.of(`#${newTag}`).itemIds[0];
            if (!newItem) return;
            action.removeLoot(lootItem);
            action.addLoot(newItem);
          }
        });
      });
    });
});