
MoreJSEvents.playerXpChange(event => {
    let player = event.player
    if (!(player instanceof $ServerPlayer)) return;
    let xpCalc = Math.ceil(event.amount);
    if (player.hasEffect('attributeslib:knowledge')) xpCalc = (xpCalc * 3) / 2;
    
    let id = Utils.id('darkages:darkages');
    let optional = SkillsAPI.getCategory(id);

    if (optional.isPresent()) {
        let category = optional.get();
        let experienceOptional = category.getExperience();
        if (experienceOptional.isPresent()) {
            let experience = experienceOptional.get();
            experience.addTotal(player, xpCalc);
        }
    }
});

MoreJSEvents.playerXpChange(event => {
    if (!event.server) return;

    let player = event.player;
    let skillLevel = getSkillCategoryLevel(player, 'darkages:darkages');

    let oldLevel = player.persistentData.level ?? -1;

    if (skillLevel > oldLevel) {
        if (skillLevel >= 5 && !questCompleted(player, '7761BF9771390928')) {
        completeQuest(player, '7761BF9771390928')
        }
        if (skillLevel >= 10 && !questCompleted(player, '7C68DF9DB69AC7AE')) {
            completeQuest(player, '7C68DF9DB69AC7AE')
        }
        event.server.runCommandSilent(`indestructible ${player.username} play "efiscompat:biped/living/casting_one_hand_staff_top_right" 0.2 0.2`); //moonless_lunar_echo
        player.sendData('darkages:sound', {
            sound: 'darkages:levelup'
        })
    }
    else return;

    player.persistentData.level = skillLevel;

    syncVariable(player, 'level', skillLevel)
});

ServerEvents.command(event => {
  if (event.commandName !== "xp") return;

  let results = event.getParseResults();
  let source = results.getContext().getSource();
  let player = source.getEntity();

  if (!(player instanceof $ServerPlayer)) return;
  let skillLevel = getSkillCategoryLevel(player, 'darkages:darkages');
  syncVariable(player, 'level', skillLevel);
});
