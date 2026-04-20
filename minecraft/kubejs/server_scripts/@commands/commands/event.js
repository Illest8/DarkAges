ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal("triggerDailyEvent")
            .requires(src => src.hasPermission(2))
            .executes(ctx => {
                const player = ctx.source.player;
                const server = ctx.source.server;

                let selected = pickConditional(global.DailyEventPool, server, player);

                if (!selected) {
                    player.tell(Text.red("No valid events available for you right now."));
                    return 0;
                }

                selected.run(server, player);
                player.tell(Text.green(`Triggered random event: ${selected.id}`));
                console.log(`[DailyEvent] Manual trigger: ${selected.id} for ${player.username}`);

                return 1;
            })
    );
});