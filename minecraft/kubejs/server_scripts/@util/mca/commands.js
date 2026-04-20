
ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Args } = event;

  event.register(
    Commands.literal('town')
      .requires(src => src.hasPermission(2))
      .executes(ctx => {
        const player = ctx.source.playerOrException;
        getTownName(player);
        return 1;
      })

      .then(
        Commands.literal('buildings')
          .executes(ctx => {
            const player = ctx.source.playerOrException;
            let buildings = [];
            getTownBuildings(player).forEach(b => buildings.push(b.getType()));
            player.tell(Text.of([`Buildings in ${getTownName(player)}: `, buildings.join(', ')]));
            return 1;
          })

          .then(
            Commands.argument("type", Args.STRING.create(event))
              .suggests((ctx, builder) => {
                const player = ctx.source.playerOrException;
                let list = [];
                getTownBuildings(player).forEach(b => list.push(b.getType()));
                list.forEach(t => builder.suggest(t));
                return builder.buildFuture();
              })
              .executes(ctx => {
                try {
                  let player = ctx.source.playerOrException;
                  let type = String(Args.STRING.getResult(ctx, "type"));
                  let location = findTownBuilding(player, type);
                  if (!location) {
                    if (player.isCreative()) {
                      player.tell(`No building of type '${type}' found.`);
                    }
                    return 0;
                  }
                  createWaypoint(player, capitalize(type), location, 'FFAA00');
                  return 1;
                } catch (error) {
                  console.log(error);
                  return 0;
                }
              })
          )
      )

      .then(
        Commands.literal('reputation')

          .executes(ctx => {
            const player = ctx.source.playerOrException;
            const results = getAllResidentHearts(player);
            results.forEach(r => {
              player.tell(`${r.name}: ${r.hearts}`);
            });
            return 1;
          })

          .then(
            Commands.argument('resident', Args.STRING.create(event))
              .suggests((ctx, builder) => {
                const player = ctx.source.playerOrException;
                const list = getTownResidents(player) || [];
                list.forEach(name => builder.suggest(name));
                return builder.buildFuture();
              })

              .executes(ctx => {
                const player = ctx.source.playerOrException;
                const residentName = Args.STRING.getResult(ctx, 'resident');
                const resident = findResidentByName(player, residentName);
                if (!resident) {
                  player.tell(`No resident named ${residentName}.`);
                  return 0;
                }
                const hearts = getResidentHearts(resident, player);
                player.tell(`${residentName} has ${hearts} hearts with you.`);
                return 1;
              })

              .then(
                Commands.literal('add')
                  .then(
                    Commands.argument('amount', Args.INTEGER.create(event))

                      .executes(ctx => {
                        const player = ctx.source.playerOrException;
                        const residentName = Args.STRING.getResult(ctx, 'resident');
                        const amount = Args.INTEGER.getResult(ctx, 'amount');
                        const resident = findResidentByName(player, residentName);
                        if (!resident) {
                          player.tell(`No resident named ${residentName}.`);
                          return 0;
                        }
                        const ok = addResidentHearts(resident, player, amount);
                        if (ok) player.tell(`Added ${amount} hearts to ${residentName} for you.`);
                        return 1;
                      })

                      .then(
                        Commands.argument('target', Args.PLAYER.create(event))
                          .executes(ctx => {
                            const player = ctx.source.playerOrException;
                            const residentName = Args.STRING.getResult(ctx, 'resident');
                            const amount = Args.INTEGER.getResult(ctx, 'amount');
                            const target = Args.PLAYER.getResult(ctx, 'target');
                            const resident = findResidentByName(player, residentName);
                            if (!resident) {
                              player.tell(`No resident named ${residentName}.`);
                              return 0;
                            }
                            const ok = addResidentHearts(resident, target, amount);
                            if (ok) {
                              player.tell(`Added ${amount} hearts to ${residentName} for ${target.name.string}.`);
                              target.tell(`${residentName} gained ${amount} hearts with you.`);
                            }
                            return 1;
                          })
                      )
                  )
              )
          )

          .then(
            Commands.literal('change')
              .then(
                Commands.argument('amount', Args.INTEGER.create(event))

                  .executes(ctx => {
                    const player = ctx.source.playerOrException;
                    const amount = Args.INTEGER.getResult(ctx, 'amount');

                    const results = addHeartsToAllResidents(player, amount);
                    let affected = results.filter(r => r.added).length;
                    let total = affected * amount;

                    player.tell(`Changed a total of ${total} hearts across ${affected} residents.`);
                    return 1;
                  })

                  .then(
                    Commands.argument('target', Args.PLAYER.create(event))
                      .executes(ctx => {
                        const player = ctx.source.playerOrException;
                        const amount = Args.INTEGER.getResult(ctx, 'amount');
                        const target = Args.PLAYER.getResult(ctx, 'target');

                        const results = addHeartsToAllResidents(target, amount);
                        let affected = results.filter(r => r.added).length;
                        let total = affected * amount;

                        player.tell(`Changed a total of ${total} hearts across ${affected} residents for ${target.name.string}. Expected reputation: ${player.persistentData.reputation + total}`);
                        target.tell(`Your reputation changed by a total of ${total} hearts across ${affected} residents. Expected reputation: ${player.persistentData.reputation + total}`);
                        return 1;
                      })
                  )
              )
          )
      )

      .then(
        Commands.literal('residents')
          .executes(ctx => {
            const player = ctx.source.playerOrException;
            let residents = getTownResidents(player);
            player.tell(residents.join(', '));
            return 1;
          })
      )

      .then(
        Commands.literal('startRaid')
          .then(
            Commands.argument('direction', Args.STRING.create(event))
              .suggests((ctx, builder) => {
                builder.suggest("north");
                builder.suggest("south");
                builder.suggest("east");
                builder.suggest("west");
                return builder.buildFuture();
              })

              .executes(ctx => {
                const player = ctx.source.playerOrException;
                const direction = Args.STRING.getResult(ctx, 'direction');

                let town = getTown(player);
                if (!town) {
                  player.tell("You are not inside a town.");
                  return 0;
                }

                spawnRaiders(player, town, direction, 5);
                player.tell(`Started a raid from the ${direction}.`);
                return 1;
              })

              .then(
                Commands.argument('count', Args.INTEGER.create(event))
                  .executes(ctx => {
                    const player = ctx.source.playerOrException;
                    const direction = Args.STRING.getResult(ctx, 'direction');
                    const count = Args.INTEGER.getResult(ctx, 'count');

                    let town = getTown(player);
                    if (!town) {
                      player.tell("You are not inside a town.");
                      return 0;
                    }

                    spawnRaiders(player, town, direction, count);
                    if (player.isCreative()) player.tell(`Started a raid from the ${direction} with ${count} vikings.`);
                    return 1;
                  })
              )
          )
      )
  );
});