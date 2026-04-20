NetworkEvents.dataReceived('darkages:sync_variables', event => {
  const data = event.data

  // console.log(`[EVENT]`, event.data)

  for (let key in data) {
    let value = data[key]

    if (Array.isArray(value)) {
      value = value
        .map(v => String(v).replace(/^"(.*)"$/, '$1'))
        .join('\n')
    }

    $VariableHandler.setVariable(key, value)
  }
})

let timestamp = 0;

NetworkEvents.dataReceived('darkages:era', event => {
  let data = event.data
  let era = data.era

  $VariableHandler.setVariable('era', era)
  $VariableHandler.setVariable('showEra', true)

  timestamp = Date.now();

  let thisEra = timestamp;

  Client.scheduleInTicks(100, () => {
    let now = Date.now();

    if (now - thisEra >= 100 && thisEra === timestamp) {
      $VariableHandler.removeVariable('showEra')
    }
  })
})

/**
 *
 * @param {Internal.SoundEvent_} sound
 * @param {Internal.SoundSource_} source
 * @param {number} volume
 * @param {number} pitch
 * @param {boolean} loop
 * @param {number} delay
 * @param {Internal.SoundInstance$Attenuation_} attenuation
 * @param {BlockPos} pos
 * @param {boolean} relative
 * @returns {Internal.SoundInstance}
 */
const $SimpleSoundInstance = Java.loadClass("net.minecraft.client.resources.sounds.SimpleSoundInstance");

const createSoundInstance = (sound, source, pos) => {
    const soundInstance = new $SimpleSoundInstance(sound, source, 1.0, 1.0, Client.level.random, false, 0, 'none', pos.x, pos.y, pos.z, false)
    return soundInstance
}

NetworkEvents.dataReceived('darkages:sound', event => {
  let data = event.data
  // Client.player.tell(data.sound)
  if (data.category) {
    Client.soundManager.play(createSoundInstance(data.sound, data.category, Client.player.blockPosition()));
    return;
  }
  Client.player.playSound(data.sound);
})

NetworkEvents.dataReceived('darkages:waypoints', event => {
  let { pos, name, color } = event.data;

  let blockPos = new $BlockPos(pos.x, pos.y, pos.z)

  let api = $WaypointManager.clientApi();
  let manager = api.waypointManager.get();

  manager
    .addWaypointAt(blockPos, name)
    .setName(name)
    .setColor(color)

  let player = Client.player;
  player.setStatusMessage(
    Text.of(name).color(color).append(
      Text.of(" has been added to your map.").white()
    )
  );
});

NetworkEvents.dataReceived("darkages:sync_skills", event => {
  let patch = $EpicFightCapabilities.getPlayerPatch(event.player);
  let cap = patch.getSkillCapability();

  if (event.data.action === "add") {
    cap.addLearnedSkill(event.data.skill);
  } else if (event.data.action === "remove") {
    cap.removeLearnedSkill(event.data.skill);
  } else if (event.data.action === 'set') {
    cap.addLearnedSkill(event.data.skill);
    getContainer(event.player, 'IDENTITY').setSkill(event.data.skill);
    getContainer(event.player, 'IDENTITY').setReplaceCooldown(0);
    getContainer(event.player, 'IDENTITY').update();
  }
});

const Handler = Java.loadClass("de.keksuccino.fancymenu.customization.customgui.CustomGuiHandler");

NetworkEvents.dataReceived('darkages:screen', event => {
  let data = event.data;
  Client.scheduleInTicks(10, () => {
    let screen = Handler.constructInstance(data.screenName, null, null)
    if (screen) {
      Client.setScreen(screen)
    }
  })
})

let TeamData = Java.loadClass('dev.ftb.mods.ftbquests.quest.TeamData')

NetworkEvents.dataReceived('darkages:quests', event => {
  let player = Client.player;
  let data = event.data;

  if ($VariableHandler.getVariable('show_quests').value === 'On') {
    TeamData.get(player).setQuestPinned(player, data.id, true);
  }
})

NetworkEvents.dataReceived("darkages:combat_reply", event => {
    let { id, allowed } = event.data;

    let mc = Java.loadClass("net.minecraft.client.Minecraft").getInstance();
    let player = mc.player;

    if (!allowed) {
        return;
    }

    let entity = mc.level.getEntities().find(e => e.getStringUuid() === id);
    if (!entity) return;

    const $InteractionHand = Java.loadClass("net.minecraft.world.InteractionHand");
    let hand = $InteractionHand.MAIN_HAND;

    mc.gameMode.interact(player, entity, hand);
});