ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("atbuilder")
      .then(
        Commands.argument("attribute", Arguments.RESOURCE_LOCATION.create(event))
          .suggests((ctx, builder) => {
            $Registry.ATTRIBUTE.forEach(attribute => {
              let id = $Registry.ATTRIBUTE.getKey(attribute);
              builder.suggest(id.toString());
            });
            return builder.buildFuture();
          })
          .then(
            Commands.argument("value", Arguments.DOUBLE.create(event))
              .executes(ctx => run(ctx, null)) // no slot provided
              .then(
                Commands.argument("slot", Arguments.STRING.create(event))
                  .suggests((ctx, builder) => {
                    builder.suggest("mainhand");
                    builder.suggest("offhand");
                    return builder.buildFuture();
                  })
                  .executes(ctx => run(ctx, Arguments.STRING.getResult(ctx, "slot")))
              )
          )
      )
  );

  function run(ctx, slot) {
    let p = ctx.source.player;
    let stack = p.mainHandItem;

    try {
      if (stack.empty) {
        p.tell("§cYou must hold an item in the selected slot.");
        return 0;
      }

      let rl = Arguments.RESOURCE_LOCATION.getResult(ctx, "attribute");
      let attribute = rl.toString();
      let attributeName = String(rl.getPath()).replace(/\./g, "-");
      let value = Arguments.DOUBLE.getResult(ctx, "value");

      let filePath = `kubejs/data/darkages/attributesetter/item/${attributeName}.json`;

      let data = {};
      try {
        data = JsonIO.read(filePath) || {};
      } catch (e) {
        data = {};
      }

      let itemId = stack.getId();

      if (!data[itemId]) data[itemId] = [];

      data[itemId] = data[itemId].filter(entry => entry.attribute !== attribute);

      let entry = {
        attribute: attribute,
        value: value,
        operation: "ADDITION"
      };

      if (slot !== null) {
        entry.slot = slot;
      }

      data[itemId].push(entry);

      JsonIO.write(filePath, data);

      p.tell(`§aAttribute ${attribute} set to ${value} for ${itemId}${slot ? ` (${slot})` : ""}.`);
      return 1;

    } catch (error) {
      console.log("ATBUILDER ERROR:", error);
      p.tell("§cAn unexpected error occurred. Check logs.");
      return 0;
    }
  }
});