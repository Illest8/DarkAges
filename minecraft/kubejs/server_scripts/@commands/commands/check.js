const $check = global.$check;

function boolStringify(result) {
  if (result == 1) {
    return 'true'
  }
  if (result == 0) {
    return 'false'
  }
  else {
    return 'This is not a boolean.'
  }
}

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  function safeExec(fn) {
    return ctx => {
      try {
        return fn(ctx);
      } catch (e) {
        console.error("[/check] Command error:", e);
        if (ctx.source && ctx.source.player && ctx.source.player.isCreative()) {
          ctx.source.player.tell("§c[Check] Internal error — see server log");
        }
        return 0;
      }
    };
  }

  event.register(
    Commands.literal('check')
      // ===== DATA =====
      .then(
        Commands.literal('data')
          .then(
            Commands.argument('key', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {
                const p = ctx.source.player;
                const key = Arguments.STRING.getResult(ctx, 'key');
                const result = $check("data", p, key) ? 1 : 0;
                if (p.isCreative()) p.tell(`§7[CheckData]§f Key '${key}' → §a${boolStringify(result)}`);
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const key = Arguments.STRING.getResult(ctx, 'key');
                    const result = $check("data", p, key, true) ? 1 : 0;
                    if (p.isCreative()) p.tell(`§7[CheckData:Invert]§f Key '${key}' → §a${boolStringify(result)}`);
                    return result;
                  }))
              )
              // value match
              .then(
                Commands.argument('value', Arguments.STRING.create(event))
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const key = Arguments.STRING.getResult(ctx, 'key');
                    const value = Arguments.STRING.getResult(ctx, 'value');
                    const result = $check("data", p, key, value) ? 1 : 0;
                    if (p.isCreative()) p.tell(`§7[CheckData:Match]§f Key '${key}' = '${value}' → §a${boolStringify(result)}`);
                    return result;
                  }))
                  .then(
                    Commands.literal('invert')
                      .executes(safeExec(ctx => {
                        const p = ctx.source.player;
                        const key = Arguments.STRING.getResult(ctx, 'key');
                        const value = Arguments.STRING.getResult(ctx, 'value');
                        const result = $check("data", p, key, value, true) ? 1 : 0;
                        if (p.isCreative()) p.tell(`§7[CheckData:Match:Invert]§f Key '${key}' = '${value}' → §a${boolStringify(result)}`);
                        return result;
                      }))
                  )
                  .then(
                    Commands.literal('higher')
                      .executes(safeExec(ctx => {
                        const p = ctx.source.player;
                        const key = Arguments.STRING.getResult(ctx, 'key');
                        const value = Arguments.STRING.getResult(ctx, 'value');
                        const result = $check("dataHigher", p, key, value) ? 1 : 0;
                        if (p.isCreative()) p.tell(`§7[CheckData:Higher]§f Key '${key}' > ${value} → §a${boolStringify(result)}`);
                        return result;
                      }))
                      .then(
                        Commands.literal('invert')
                          .executes(safeExec(ctx => {
                            const p = ctx.source.player;
                            const key = Arguments.STRING.getResult(ctx, 'key');
                            const value = Arguments.STRING.getResult(ctx, 'value');
                            const result = $check("dataHigher", p, key, value, true) ? 1 : 0;
                            if (p.isCreative()) p.tell(`§7[CheckData:Higher:Invert]§f Key '${key}' > ${value} → §a${boolStringify(result)}`);
                            return result;
                          }))
                      )
                  )
                  .then(
                    Commands.literal('lower')
                      .executes(safeExec(ctx => {
                        const p = ctx.source.player;
                        const key = Arguments.STRING.getResult(ctx, 'key');
                        const value = Arguments.STRING.getResult(ctx, 'value');
                        const result = $check("dataLower", p, key, value) ? 1 : 0;
                        if (p.isCreative()) p.tell(`§7[CheckData:Lower]§f Key '${key}' < ${value} → §a${boolStringify(result)}`);
                        return result;
                      }))
                      .then(
                        Commands.literal('invert')
                          .executes(safeExec(ctx => {
                            const p = ctx.source.player;
                            const key = Arguments.STRING.getResult(ctx, 'key');
                            const value = Arguments.STRING.getResult(ctx, 'value');
                            const result = $check("dataLower", p, key, value, true) ? 1 : 0;
                            if (p.isCreative()) p.tell(`§7[CheckData:Lower:Invert]§f Key '${key}' < ${value} → §a${boolStringify(result)}`);
                            return result;
                          }))
                      )
                  )
              )
          )
      )
      // ===== QUEST =====
      .then(
        Commands.literal('quest')
          .then(
            Commands.argument('questId', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {
                const p = ctx.source.player;
                const questId = Arguments.STRING.getResult(ctx, 'questId');
                const result = questCompleted(p, questId) ? 1 : 0;
                if (p.isCreative()) p.tell(`§7[CheckQuest]§f Quest '${questId}' completed → §a${boolStringify(result)}`);
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const questId = Arguments.STRING.getResult(ctx, 'questId');
                    const result = questCompleted(p, questId) ? 0 : 1; // invert
                    if (p.isCreative()) p.tell(`§7[CheckQuest:Invert]§f Quest '${questId}' completed → §a${boolStringify(result)}`);
                    return result;
                  }))
              )
          )
      )
      // ===== QUEST AVAILABLE =====
      .then(
        Commands.literal('questAvailable')
          .then(
            Commands.argument('questId', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {
                const p = ctx.source.player;
                const questId = Arguments.STRING.getResult(ctx, 'questId');
                const result = questAvailable(p, questId) ? 1 : 0;
                if (p.isCreative()) p.tell(`§7[CheckquestAvailable]§f Quest '${questId}' available → §a${boolStringify(result)}`);
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const questId = Arguments.STRING.getResult(ctx, 'questId');
                    const result = questAvailable(p, questId) ? 0 : 1; // invert
                    if (p.isCreative()) p.tell(`§7[CheckquestAvailable:Invert]§f Quest '${questId}' available → §a${boolStringify(result)}`);
                    return result;
                  }))
              )
          )
      )
      // =====STAGE =====
      .then(
        Commands.literal('stage')
          .then(
            Commands.argument('stageName', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {
                const p = ctx.source.player;
                const stageName = Arguments.STRING.getResult(ctx, 'stageName');
                const result = $check("stage", p, stageName) ? 1 : 0;
                if (p.isCreative()) p.tell(`§7[CheckStage]§f Stage '${stageName}' → §a${boolStringify(result)}`);
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const stageName = Arguments.STRING.getResult(ctx, 'stageName');
                    const result = $check("stage", p, stageName, true) ? 1 : 0;
                    if (p.isCreative()) p.tell(`§7[CheckStage:Invert]§f Stage '${stageName}' → §a${boolStringify(result)}`);
                    return result;
                  }))
              )
          )
      )
      // ===== STRUCTURE =====
      .then(
        Commands.literal('structure')
          .then(
            Commands.argument('structureId', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {
                const p = ctx.source.player;
                const structureId = Arguments.STRING.getResult(ctx, 'structureId');

                const level = p.level;
                const blockPos = p.blockPosition();

                const structures = getStructuresAtPos(level, blockPos);
                const result = structures.includes(structureId) ? 1 : 0;

                if (p.isCreative()) {
                  p.tell(`§7[CheckStructure]§f Standing at ${blockPos}, structure '${structureId}' → §a${boolStringify(result)}`);
                }
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const structureId = Arguments.STRING.getResult(ctx, 'structureId');

                    const level = p.level;
                    const blockPos = p.blockPosition();

                    const structures = getStructuresAtPos(level, blockPos);
                    const result = structures.includes(structureId) ? 0 : 1; // invert

                    if (p.isCreative()) {
                      p.tell(`§7[CheckStructure:Invert]§f Standing at ${blockPos}, structure '${structureId}' → §a${boolStringify(result)}`);
                    }
                    return result;
                  }))
              )
          )
      )
      // ===== BUILDING =====
      .then(
        Commands.literal('building')
          .then(
            Commands.argument('buildingId', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {

                let player = ctx.source.player;
                let buildingId = Arguments.STRING.getResult(ctx, 'buildingId');

                let blockPos = player.blockPosition();

                if (getTownBuilding(player, blockPos) == false) {
                  player.tell(Text.of('You are not in a building.').italic().red())
                  return 1;
                }

                let buildings = getTownBuilding(player, blockPos).getType();
                let result = buildings.includes(buildingId) ? 1 : 0;

                if (player.isCreative()) {
                  player.tell(`§7[CheckBuilding]§f Standing at ${blockPos}, building '${buildingId}' → §a${boolStringify(result)}`);
                }
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    let player = ctx.source.player;
                    let buildingId = Arguments.STRING.getResult(ctx, 'buildingId');

                    let blockPos = player.blockPosition();

                    if (getTownBuilding(player, blockPos) == false) {
                      player.tell(Text.of('You are not in a building.').italic().red())
                      return 1;
                    }

                    let buildings = getTownBuilding(player, blockPos).getType();
                    let result = buildings.includes(buildingId) ? 0 : 1; // invert

                    if (player.isCreative()) {
                      player.tell(`§7[CheckBuilding:Invert]§f Standing at ${blockPos}, building '${buildingId}' → §a${boolStringify(result)}`);
                    }
                    return result;
                  }))
              )
          )
      )
      // // ===== TOWN =====
      .then(
        Commands.literal('town')
          .then(
            Commands.argument('buildingType', Arguments.STRING.create(event))
              .executes(safeExec(ctx => {
                let player = ctx.source.player;
                let buildingType = Arguments.STRING.getResult(ctx, 'buildingType');

                let found = findTownBuilding(player, buildingType);
                if (found === false) {
                  if (player.isCreative()) {
                    player.tell(Text.of('You are not in a town.').italic().red());
                  }
                  return 1;
                }

                let result = found ? 1 : 0;

                if (player.isCreative()) {
                  player.tell(`§7[CheckTown]§f Town has building '${buildingType}' → §a${boolStringify(result)}`);
                }

                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    let player = ctx.source.player;
                    let buildingType = Arguments.STRING.getResult(ctx, 'buildingType');

                    let found = findTownBuilding(player, buildingType);
                    if (found === false) {
                      if (player.isCreative()) {
                      player.tell(Text.of('You are not in a town.').italic().red());
                      }
                      return 1;
                    }

                    let result = found ? 0 : 1;

                    if (player.isCreative()) {
                      player.tell(`§7[CheckTown:Invert]§f Town has building '${buildingType}' → §a${boolStringify(result)}`);
                    }

                    return result;
                  }))
              )
          )
      )
      // ===== ITEM =====
      .then(
        Commands.literal('item')
          .then(
            Commands.argument('itemId', Arguments.ITEM_STACK.create(event))
              .executes(safeExec(ctx => {
                const p = ctx.source.player;
                const itemInput = Arguments.ITEM_STACK.getResult(ctx, 'itemId');
                const stack = itemInput.createItemStack(1, false);
                const itemId = stack.id;
                const result = $check("item", p, itemId) ? 1 : 0;
                if (p.isCreative()) p.tell(`§7[CheckItem]§f Item '${itemId}' → §a${boolStringify(result)}`);
                return result;
              }))
              .then(
                Commands.literal('invert')
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const itemInput = Arguments.ITEM_STACK.getResult(ctx, 'itemId');
                    const stack = itemInput.createItemStack(1, false);
                    const itemId = stack.id;
                    const result = $check("item", p, itemId, true) ? 1 : 0;
                    if (p.isCreative()) p.tell(`§7[CheckItem:Invert]§f Item '${itemId}' → §a${boolStringify(result)}`);
                    return result;
                  }))
              )
              .then(
                Commands.argument('amount', Arguments.INTEGER.create(event))
                  .executes(safeExec(ctx => {
                    const p = ctx.source.player;
                    const itemInput = Arguments.ITEM_STACK.getResult(ctx, 'itemId');
                    const stack = itemInput.createItemStack(1, false);
                    const itemId = stack.id;
                    const amount = Arguments.INTEGER.getResult(ctx, 'amount');
                    const result = $check("item", p, itemId, amount) ? 1 : 0;
                    if (p.isCreative()) p.tell(`§7[CheckItem]§f Item '${itemId}' x${amount} → §a${boolStringify(result)}`);
                    return result;
                  }))
                  .then(
                    Commands.literal('invert')
                      .executes(safeExec(ctx => {
                        const p = ctx.source.player;
                        const itemInput = Arguments.ITEM_STACK.getResult(ctx, 'itemId');
                        const stack = itemInput.createItemStack(1, false);
                        const itemId = stack.id;
                        const amount = Arguments.INTEGER.getResult(ctx, 'amount');
                        const result = $check("item", p, itemId, amount, true) ? 1 : 0;
                        if (p.isCreative()) p.tell(`§7[CheckItem:Invert]§f Item '${itemId}' x${amount} → §a${boolStringify(result)}`);
                        return result;
                      }))
                  )
              )
          )
      )
  );
});
