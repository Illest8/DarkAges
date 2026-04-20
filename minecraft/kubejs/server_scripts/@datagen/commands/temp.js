ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  event.register(
    Commands.literal("newTemp")
      .then(
        Commands.argument("type", Arguments.STRING.create(event))
          .then(
            Commands.argument("amount", Arguments.INTEGER.create(event))
              .executes(ctx => {
                try {
                  let type = Arguments.STRING.getResult(ctx, "type").toLowerCase();
                  let amount = Arguments.INTEGER.getResult(ctx, "amount");
                  let p = ctx.source.player;
                  let item = p.mainHandItem.id;

                  let validTypes = ["heat", "cold", "thermal"];
                  if (!validTypes.includes(type)) {
                    p.tell("§cType must be: heat, cold, or thermal.");
                    return 0;
                  }

                  let [namespace, itemName] = item.split(':');

                  let path = `kubejs/data/${namespace}/legendarysurvivaloverhaul/temperature/items/${itemName}.json`;

                  let jsonContent = {
                    cold_resistance: 0.0,
                    heat_resistance: 0.0,
                    temperature: 0.0,
                    thermal_resistance: 0.0
                  };

                  let keyMap = {
                    heat: "heat_resistance",
                    cold: "cold_resistance",
                    thermal: "thermal_resistance"
                  };

                  jsonContent[keyMap[type]] = amount * 1.0;

                  JsonIO.write(path, jsonContent);

                  p.tell(`§aTemperature type '${type}' set to ${amount} for ${itemName}`);
                  return 1;

                } catch (err) {
                  console.log("[TempInv] ERROR:", err);
                  return 0;
                }
              })
          ))
  );
}); 