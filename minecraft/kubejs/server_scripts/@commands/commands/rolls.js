// server_scripts/dice_roll.js
ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal('roll')
      // No-arg roll: just return the number
      .executes(ctx => {
        const roll = Math.floor(Math.random() * 6) + 1;
        ctx.source.sendSuccess(Text.of(`🎲 You rolled: ${roll}`), false);
        return roll;
      })
      // Optional range argument: "min-max"
      .then(
        Commands.argument('range', Arguments.STRING.create(event))
          .executes(ctx => {
            const rangeArg = Arguments.STRING.getResult(ctx, 'range').trim();
            const roll = Math.floor(Math.random() * 6) + 1;

            // Parse "min-max"
            const parts = rangeArg.split('-');
            if (parts.length !== 2) {
              // ctx.source.sendFailure(Text.of('Invalid range. Use format like 4-6.'));
              return 0;
            }

            const min = parseInt(parts[0], 10);
            const max = parseInt(parts[1], 10);

            // Validate range
            if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max > 6 || min > max) {
              // ctx.source.sendFailure(Text.of('Invalid range. Use format like 4-6, within 1-6.'));
              return 0;
            }

            const success = roll >= min && roll <= max;
            ctx.source.sendSuccess(Text.of(`🎲 You rolled: ${roll} → ${success ? 1 : false}`), false);
            return success ? 1 : 0;
          })
      )
  );
});