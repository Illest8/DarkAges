PlayerEvents.chat(event => {
    const { player, message, server } = event;

    // FieldGuide.getProgress(player).getUnlockedEntries().forEach(entry => {
    //     player.tell(entry)
    // })

    const team = getTeam(player);
    const teamName = team.getName().getString();
    const colorInt = team.color;

    let displayTeamName = teamName;

    if (teamName.length() > 15) {
        displayTeamName = teamName.substring(0, 15) + "…";
    }

    let prefix;

    if (teamName === player.username) {
        prefix = [
            Text.of(player.displayName).color('#E49800')
        ];
    } else {
        prefix = [
            Text.of(displayTeamName).color(colorInt).bold(),
            ' ',
            Text.of(player.displayName.color(colorInt))
        ];
    }

    const output = [
        prefix,
        Text.gray(" >> "),
        Text.of(message).italic()
    ];

    server.tell(output);
    event.cancel();
});