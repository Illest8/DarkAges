
let $VariableHandler = Java.loadClass('de.keksuccino.fancymenu.customization.variables.VariableHandler')
const $HardcoreRevival = Java.loadClass('net.blay09.mods.hardcorerevival.HardcoreRevival')

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event
  event.register(Commands.literal('fullrevive')
    .requires(s => s.hasPermission(2))
    .executes(c => {
      let revivalManager = $HardcoreRevival.getManager()
      if (revivalManager.getRevivalData(c.source.player).isKnockedOut()) {
        revivalManager.wakeup(c.source.player)
      }
      c.source.player.setHealth(c.source.player.getMaxHealth())
      epicfightPatch(c.source.player).setStamina(epicfightPatch(c.source.player).getMaxStamina())
      c.source.player.server.runCommandSilent(`bodydamage ${c.source.player.username} heal ALL 100`)
      c.source.player.extinguish();
      c.source.player.server.runCommandSilent(`execute as ${c.source.player.username} run temperature set 20`)
      removeHarmfulEffects(c.source.player)
      return 1;
    })
  )
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('toggleOverlay')
      .requires(s => s.hasPermission(0))
      .executes(ctx => {
        const player = ctx.source.player
        if (!player) return 0

        let caps = player.nbt.ForgeCaps
        if (!caps) return 0

        let perms = caps["cloakanddagger:permissions"]
        if (!perms) return 0

        let current = perms.see ?? 0

        if (current === 0) {
          ctx.source.server.runCommandSilent(
            `cloakanddagger toggle ${player.username} overlay true`
          )
        } else {
          ctx.source.server.runCommandSilent(
            `cloakanddagger toggle ${player.username} overlay false`
          )
        }

        return 1
      })
  )
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('dailyEvent')
      .requires(s => s.hasPermission(1))
      .executes(ctx => {
        const player = ctx.source.player
        if (!player) return 0

        const server = ctx.source.server
        let current = server.persistentData.dailyEvents
        if (current === undefined) current = true

        const newState = !current
        server.persistentData.dailyEvents = newState

        player.tell(newState ? 'Daily events enabled.' : 'Daily events disabled.')
        return 1
      })
  )
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event
  event.register(Commands.literal('dark_reload')
    .requires(s => s.hasPermission(2))
    .executes(c => {
      c.source.player.runCommandSilent(`kjs reload startup_scripts`)
      c.source.player.runCommandSilent(`kjs reload server_scripts`)
      return 1;
    })
  )
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('pdata')
      .requires(s => s.hasPermission(2))
      .executes(ctx => {
        const player = ctx.source.player

        const data = player.persistentData

        if (Object.keys(data).length === 0) {
          player.tell([
            Text.darkGray('['),
            Text.gold('PlayerData'),
            Text.darkGray('] '),
            Text.red('No persistent data found.')
          ])
          return 1
        }

        player.tell([
          Text.darkGray('['),
          Text.gold('PlayerData'),
          Text.darkGray('] '),
          Text.green(`Your stored data:`)
        ])

        for (const [key, value] of Object.entries(data)) {
          player.tell([
            Text.darkGray('- '),
            Text.aqua(key),
            Text.darkGray(': '),
            Text.white(String(value))
          ])
        }

        return 1
      })
  )
})

function xpForLevel(level) {
  return Math.min(100 + Math.pow(level, 1.77));
}

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("skilltree")
      .requires(src => src.hasPermission(0))

      .executes(c => {
        SkillsAPI.openScreen(c.source.player);
        return 1;
      })

      .then(
        Commands.literal("reset")
          .requires(src => src.hasPermission(2))
          .then(
            Commands.argument("target", Arguments.PLAYER.create(event))
              .executes(c => {
                const target = Arguments.PLAYER.getResult(c, "target");
                const category = SkillsAPI.getCategory(Utils.id("darkages:darkages"));

                if (category.isPresent()) {
                  const darkages = category.get();
                  darkages.erase(target);
                }

                c.source.player.tell(
                  Text.green(`Reset skilltree for ${target.getName().getString()}.`)
                );

                target.tell(Text.green("Your skilltree has been reset."));


                delete target.persistentData.level;
                let skillLevel = getSkillCategoryLevel(target, 'darkages:darkages');
                syncVariable(target, 'level', skillLevel);

                return 1;
              })
          )
          .executes(c => {
            const player = c.source.player;
            const category = SkillsAPI.getCategory(Utils.id("darkages:darkages"));

            if (category.isPresent()) {
              const darkages = category.get();
              darkages.erase(player);
            }

            delete player.persistentData.level
            let skillLevel = getSkillCategoryLevel(player, 'darkages:darkages');
            syncVariable(player, 'level', skillLevel);
            player.tell(Text.green("Your skilltree has been reset."));
            return 1;
          })
      )
  );
});

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;
  event.register(
    Commands.literal('magicLevel')
      .requires(s => s.hasPermission(2))
      .then(Commands.argument('level', Arguments.INTEGER.create(event))
        .executes((ctx) => {
          const spellLevel = Arguments.INTEGER.getResult(ctx, 'level');
          ctx.source.player.persistentData.magicLevel = spellLevel;
          ctx.source.player.tell(`Magic level set to: ${spellLevel}`);
          return 1;
        })
      )
  );
});

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event
  event.register(Commands.literal('decrementmana')
    .requires(s => s.hasPermission(2))
    .executes(c => {
      if (!c.source.player) return;
      c.source.player.server.runCommandSilent(`execute as ${c.source.player.username} run mana add ${c.source.player.username} -${c.source.player.getAttributeValue('irons_spellbooks:max_mana') * 0.2}`)
      return 1;
    })
  )
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event
  event.register(Commands.literal('afk')
    .requires(s => s.hasPermission(0))
    .executes(c => {
      if (!c.source.player) return;
      c.source.player.server.tell(Text.of(`${c.source.player.username} is AFK.`).italic())
      c.source.player.server.runCommandSilent(`execute as ${c.source.player.username} run openguiscreen tutorial`)
      return 1;
    })
  )
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  event.register(Commands.literal('god')
    .requires(s => s.hasPermission(2))
    .executes(c => god(c.source.player))
    .then(Commands.argument('target', Arguments.PLAYER.create(event))
      .executes(c => god(Arguments.PLAYER.getResult(c, 'target')))
    )
  )

  let god = (player) => {
    if (player.persistentData.god == 1) {
      player.abilities.mayfly = false
      player.abilities.flying = false
      player.setAttributeBaseValue('legendarysurvivaloverhaul:thermal_resistance', 0)
      delete player.persistentData.god
      // player.server.runCommandSilent(`scale set pehkui:defense 1 ${player.username}`)
      player.setInvulnerable(false)
      player.displayClientMessage(Component.gold('God Mode: ').append(Component.red('disabled')), true)
    } else {
      player.abilities.mayfly = true
      player.persistentData.god = 1;
      player.setAttributeBaseValue('legendarysurvivaloverhaul:thermal_resistance', 50)
      player.setInvulnerable(true)
      player.displayClientMessage(Component.gold('God Mode: ').append(Component.green('enabled')), true)
    }
    player.onUpdateAbilities()
    return 1
  }
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("pvp")
      .executes(c => pvpFlag(c.source.player))
  )
  let pvpFlag = (player) => {
    if (player.persistentData.pvpOff) {
      delete player.persistentData.pvpOff
      player.tell('pvp is on')
    }
    else {
      player.persistentData.pvpOff = 1
      player.tell('pvp is off')
    }
    return 1;
  }
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("updateStats")
      .executes(c => {
        const player = c.source.player;

        player.sendData('darkages:sync_variables', {
          statStamina: player.getAttributeTotalValue('epicfight:staminar'),
          statStealth: player.getAttributeTotalValue('footwork:stealth'),
          statSmithing: player.getAttributeTotalValue('darkages:smithing')
        });

        return 1;
      })
  )
});

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal('identity')
      .requires(s => s.hasPermission(2))
      .then(
        Commands.argument('skill', Arguments.STRING.create(event))
          .suggests((ctx, builder) => {
            let skills = listSkills();
            skills.forEach(s => builder.suggest(s));
            return builder.buildFuture();
          })
          .executes(ctx => {
            const skill = Arguments.STRING.getResult(ctx, 'skill');
            const player = ctx.source.player;

            let final = String(`darkages:${skill}`);
            setSkill(player, final);

            return 1;
          })
      )
  );
});

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("questComplete")
      .requires(src => src.hasPermission(2))
      .then(
        Commands.argument("questId", Arguments.STRING.create(event))

          .then(
            Commands.argument("target", Arguments.PLAYER.create(event))
              .executes(c => {
                const questId = Arguments.STRING.getResult(c, "questId");
                const target = Arguments.PLAYER.getResult(c, "target");
                completeQuest(target, questId);
                return 1;
              })
          )

          .executes(c => {
            const questId = Arguments.STRING.getResult(c, "questId");
            const player = c.source.player;
            completeQuest(player, questId);
            return 1;
          })
      )
  );
});