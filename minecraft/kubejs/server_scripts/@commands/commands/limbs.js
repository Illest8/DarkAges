ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event
  event.register(
    Commands.literal("checklimbs")
      .executes(ctx => {
        let player = ctx.source.player;

        let body = player.getNbt()
          .getCompound("ForgeCaps")
          .getCompound("legendarysurvivaloverhaul:body_damage");

        let limbs = [
          "HEAD_damage",
          "CHEST_damage",
          "LEFT_ARM_damage",
          "RIGHT_ARM_damage",
          "LEFT_LEG_damage",
          "RIGHT_LEG_damage",
          "LEFT_FOOT_damage",
          "RIGHT_FOOT_damage"
        ];

        let damaged = limbs.filter(limb => body.getFloat(limb) >= 1.0);

        if (damaged.length === 0) {
          // player.tell(Text.green("✅ All limbs are at max health!"));
          player.sendData('darkages:sync_variables', {
            limbDamage: 0
          })
        } else {
          // player.tell(Text.red("Damaged limbs: " + damaged.join(", ")));
          player.sendData('darkages:sync_variables', {
            limbDamage: 1
          })
        }
        return 1;
      })
  );
});