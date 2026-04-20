ServerEvents.commandRegistry((e) => {
  const { commands: Commands, arguments: Arguments } = e;

  function clearPlayerProfession(player, server) {

    player.persistentData.remove('profession');
    player.sendData('darkages:sync_variables', {
      profession: ''
    });
  }

  e.register(
    Commands.literal('profession')
      .requires(s => s.hasPermission(0))

      .then(Commands.literal('clear')
        .requires(s => s.hasPermission(2))

        // Default (self)
        .executes(ctx => {
          const player = ctx.source.player;
          clearPlayerProfession(player, ctx.source.server);
          player.stages.remove('job')
          return 1;
        })

        // Optional 'target' argument
        .then(Commands.argument('target', Arguments.PLAYER.create(e))
          .executes(ctx => {
            const target = Arguments.PLAYER.getResult(ctx, 'target');
            clearPlayerProfession(target, ctx.source.server);
            target.stages.remove('job')
            return 1;
          })
        )
      )

      .then(
        Commands.argument('profession_name', Arguments.STRING.create(e))
          // .suggests((ctx, builder) => {
          //   const classNames = Object.keys(global.POWERS || {});
          //   return builder.suggest(classNames).build();
          // })

          .executes(ctx => {
            const player = ctx.source.player;
            const professionName = Arguments.STRING.getResult(ctx, 'profession_name');

            if (player.persistentData.profession) {
              player.tell(`You already have a profession, ${player.persistentData.profession}`);
              return 0;
            }

            player.sendData('darkages:sync_variables', {
              profession: professionName
            })
            player.persistentData.profession = professionName
            player.stages.add('job')
            return 1
          })
      )
  );
});
