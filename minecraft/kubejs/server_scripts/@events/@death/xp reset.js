EntityEvents.death(event => {
    let player = event.entity;
    if (!player.isPlayer()) return;

    let reset = resetSkillCategoryProgress(player, 'darkages:darkages');
    if (reset) {
        player.tell("Your progress in your current level has been reset due to death.");
    }
});
