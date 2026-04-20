ServerEvents.commandRegistry(event => {
  let Commands = event.commands;
  let Arguments = event.arguments;

  event.register(
    Commands.literal("makeTag")
      .then(
        Commands.argument("namespace", Arguments.STRING.create(event))
          .then(
            Commands.argument("type", Arguments.STRING.create(event))
              .then(
                Commands.argument("tagName", Arguments.STRING.create(event))
                  .executes(ctx => run(ctx, false))
                  .then(
                    Commands.literal("merge")
                      .executes(ctx => run(ctx, true))
                  )
              )
          )
      )
  );

  function arrayContains(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) return true;
    }
    return false;
  }

  function run(ctx, mergeMode) {
    try {
      let p = ctx.source.player;
      let namespace = Arguments.STRING.getResult(ctx, "namespace");
      let tagCategory = Arguments.STRING.getResult(ctx, "type");
      let tagName = Arguments.STRING.getResult(ctx, "tagName");

      let tagPath = `kubejs/data/${namespace}/tags/${tagCategory}/${tagName}.json`;

      let items = [];
      for (let i = 0; i < p.inventory.getContainerSize(); i++) {
        let stack = p.inventory.getItem(i);
        if (!stack.empty) items.push(stack.item.id);
      }

      let existing;
      try {
        existing = JsonIO.read(tagPath) || {};
      } catch (e) {
        existing = {};
      }

      if (!existing.values) existing.values = [];

      let finalValues;

      if (mergeMode) {
        existing.values = existing.values.filter(v => !arrayContains(items, v));
        for (let i = 0; i < items.length; i++) {
          existing.values.push(items[i]);
        }
        finalValues = existing.values;
      } else {
        finalValues = items;
      }

      JsonIO.write(tagPath, {
        replace: !mergeMode,
        values: finalValues
      });

      let listPath = "kubejs/data/darkages/emi_groups.json";
      let data;
      try {
        data = JsonIO.read(listPath) || { groups: [] };
      } catch (e) {
        data = { groups: [] };
      }

      let tagRef = `#${namespace}:${tagName}`;
      if (!arrayContains(data.groups, tagRef)) {
        data.groups.push(tagRef);
      }

      JsonIO.write(listPath, data);

      p.tell(`§aTag ${tagName} ${mergeMode ? "merged" : "created"} in ${namespace}/tags/${tagCategory}.`);
      return 1;

    } catch (err) {
      ctx.source.player.tell("§cAn error occurred while running makeTag.");
      console.error(err);
      return 0;
    }
  }
});