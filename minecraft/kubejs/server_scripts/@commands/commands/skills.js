ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    const DEFAULT_SKILLS = [
        'darkages:acolyte',
        'darkages:crusader',
        'darkages:warden',
        'darkages:hunter',
        'darkages:thief',
        'darkages:reaver'
    ];

    event.register(
        Commands.literal("skills")
            .requires(src => src.hasPermission(2))
            .then(
                Commands.literal("grant")
                    .executes(ctx => {
                        const player = ctx.source.player;

                        DEFAULT_SKILLS.forEach(skill => {
                            grantSkill(player, skill);
                        });

                        player.tell(Text.green("Default skills granted."));
                        return 1;
                    })
            )
            .then(
                Commands.literal("remove")
                    .executes(ctx => {
                        const player = ctx.source.player;

                        DEFAULT_SKILLS.forEach(skill => {
                            removeSkill(player, skill);
                        });

                        player.tell(Text.red("Default skills removed."));
                        return 1;
                    })
            )
    );
});