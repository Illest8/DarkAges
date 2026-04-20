// priority: 999
global.prisonSpawn = null

const $UUID = Java.loadClass('java.util.UUID');

ServerEvents.loaded(event => {
  global.spellList = []
  let $SpellRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')

  const excludedSpells = [
    'wololo',
    'greater_heal',
    'invisibility',
    'portal',
    'summon_ender_chest',
    'summon_polar_bear',
    'abyssal_shroud',
    'sculk_tentacles',
    'sonic_boom',
    'planar_sight',
    'telekinesis',
    'eldritch_blast',
    'pocket_dimension',
    'recall',
    'black_hole'
  ]

  $SpellRegistry.getEnabledSpells().forEach(spell => {
    if (excludedSpells.some(e => spell.getSpellId().includes(e))) {
      return;
    }

    global.spellList.push(spell.getSpellId());
  })

  let server = event.server

  if (server.persistentData.gameRules) return
  server.getCommands().getDispatcher().getRoot().getChildren().removeIf(command => command.getName().includes("furtotems"))
  server.gameRules.set("keepInventory", true)
  server.gameRules.set("announceAdvancements", false)
  server.gameRules.set("logAdminCommands", false)
  server.gameRules.set("spawnRadius", "0")
  server.gameRules.set("disableRaids", true)
  server.gameRules.set("weightPenalty", "10")
  server.gameRules.set("puffish_skills:announceNewPoints", false)
  server.persistentData.worldUUID = $UUID.randomUUID().toString()
  server.persistentData.player_count = 0
  server.persistentData.gameRules = true
})

function getRandomSpell() {
  const spells = global.spellList
  const spell = spells[Math.floor(Math.random() * spells.length)]
  return spell;
}

const RegistryAccess = Java.loadClass("net.minecraft.core.RegistryAccess");
const ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const TagKey = Java.loadClass("net.minecraft.tags.TagKey");

ServerEvents.loaded(event => {
  // return;
  let server = event.server;
  let data = server.persistentData;
  let level = server.overworld();
  let tag = "prison";

  if (data.prisonSpawn) {
    let pos = data.prisonSpawn;
    level.setDefaultSpawnPos({ x: pos.x, y: pos.y - 1, z: pos.z }, 0.0);
    console.log(`${tag} spawn restored at (${pos.x}, ${pos.y}, ${pos.z})`);
    return;
  }

  let villageTagKey = TagKey.create(Registries.STRUCTURE, new ResourceLocation("darkages", tag));
  let villagePos = level.findNearestMapStructure(villageTagKey, level.getSharedSpawnPos(), 100, false);

  if (!villagePos) {
    console.log(`[KubeJS] No ${tag} structure found nearby. Spawn remains unchanged.`);
    return;
  }

  let minY = level.minBuildHeight;
  let maxY = level.maxBuildHeight;
  let highestY = -Infinity;
  let bedrockPos = null;

  for (let dx = -20; dx <= 20; dx++) {
    for (let dz = -20; dz <= 20; dz++) {
      for (let dy = maxY; dy >= minY; dy--) {
        let bx = villagePos.x + dx;
        let by = dy;
        let bz = villagePos.z + dz;
        let block = level.getBlock(bx, by, bz);
        if (block.id === "create:zinc_block" && by > highestY) {
          highestY = by;
          bedrockPos = { x: bx, y: by, z: bz };
        }
      }
    }
  }

  if (!bedrockPos) {
    console.log("[KubeJS] No zinc block found nearby. Spawn remains unchanged.");
    return;
  }

  let spawnPos = { x: bedrockPos.x, y: bedrockPos.y + 1, z: bedrockPos.z };
  data.prisonSpawn = spawnPos; // store permanently
  level.setDefaultSpawnPos(bedrockPos, 0.0);
  console.log(`${tag} spawn set at (${spawnPos.x}, ${spawnPos.y}, ${spawnPos.z})`);
});

ServerEvents.loaded(event => {
  const server = event.server

  const isCheatsEnabled = server.isSingleplayer() ? server.getWorldData().getAllowCommands() : true

  if (isCheatsEnabled) {
    $VariableHandler.setVariable('cheats', 1.0)
  } else {
    $VariableHandler.setVariable('cheats', 0.0)
    console.log("Cheats are disabled.")
  }
})

ServerEvents.loaded(event => {
  let server = event.server;
  let level = server.overworld();
  let data = server.persistentData;

  if (!data.prisonSpawn) return;

  const ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos");

  let spawnPos = data.prisonSpawn;
  let chunkX = Math.floor(spawnPos.x / 16);
  let chunkZ = Math.floor(spawnPos.z / 16);

  let radius = 2;

  for (let dx = -radius; dx <= radius; dx++) {
    for (let dz = -radius; dz <= radius; dz++) {
      let cx = chunkX + dx;
      let cz = chunkZ + dz;

      let chunkPos = new ChunkPos(cx, cz);

      level.getChunkSource().updateChunkForced(chunkPos, true);
    }
  }
});

// REQUIRED CLASSES

const $Player = Java.loadClass('net.minecraft.world.entity.player.Player')
const $Registry = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

// EpicFight
const EpicFightCapabilities = Java.loadClass('yesman.epicfight.world.capabilities.EpicFightCapabilities');
const LivingEntityPatch = Java.loadClass('yesman.epicfight.world.capabilities.entitypatch.LivingEntityPatch');
const $SkillManager = Java.loadClass('yesman.epicfight.api.data.reloader.SkillManager')
const $SkillSlot = Java.loadClass('yesman.epicfight.skill.SkillSlot');

// Apoth
const $LootCategory = Java.loadClass('dev.shadowsoffire.apotheosis.adventure.loot.LootCategory');
const $LootController = Java.loadClass('dev.shadowsoffire.apotheosis.adventure.loot.LootController');
const $RarityRegistry = Java.loadClass('dev.shadowsoffire.apotheosis.adventure.loot.RarityRegistry');

// MCA
const $PlayerSaveData = Java.loadClass('forge.net.mca.server.world.data.PlayerSaveData');
const $VillageManager = Java.loadClass('forge.net.mca.server.world.data.VillageManager');

// GOALS
const $RangedAttack = Java.loadClass('net.minecraft.world.entity.ai.goal.RangedBowAttackGoal');

// SEASON
const $NewSeason = Java.loadClass('com.teamtea.eclipticseasons.api.event.SolarTermChangeEvent')

// FTB
const $ProgressChange = Java.loadClass("dev.ftb.mods.ftbquests.util.ProgressChange");

// EVENTJS
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority');

function openGateway(player, gateway) {
  player.server.runCommandSilent(`open_gateway ${player.username} darkages:gateways/${gateway}`)
}

function epicfightPatch(entity) {
  return EpicFightCapabilities.getEntityPatch(entity, LivingEntityPatch)
}

function syncSkill(player, skillId, action) {
  player.sendData("darkages:sync_skills", {
    skill: skillId,
    action: action
  });
}

function setSkill(player, skillId) {
  getContainer(player, 'IDENTITY').setSkill(skillId)
  syncSkill(player, skillId, 'set')
  return true
}

function grantSkill(player, skillId) {
  const cap = epicfightPatch(player).getSkillCapability();

  const learned = cap.listAcquiredSkills()
    .toList()
    .map(s => s.toString())
    .filter(id => !id.includes("edp"));

  if (learned.some(id => id.includes(skillId))) return false;

  cap.addLearnedSkill(skillId);
  syncSkill(player, skillId, "add");
  return true;
}

function removeSkill(player, skillId) {
  const cap = epicfightPatch(player).getSkillCapability();

  const learned = cap.listAcquiredSkills()
    .toList()
    .map(s => s.toString());

  if (!learned.some(id => id.includes(skillId))) return false;

  cap.removeLearnedSkill(skillId);
  syncSkill(player, skillId, "remove");
  return true;
}

function listSkills() {
  let skills = []
  $SkillManager.getSkillRegistry().entries.forEach(skill => {
    let category = skill.getValue().getCategory()
    let key = skill.getValue().getRegistryName()
    if (skill.getKey().toString().includes('darkages') && category == 'IDENTITY') {
      let keyString = String(key)
      let name = keyString.split(':')[1]
      skills.push(name)
    }
  })
  return skills;
}

function getContainer(player, slot) {
  let container = $SkillSlot.ENUM_MANAGER.getOrThrow(slot);
  return epicfightPatch(player).getSkillCapability().getSkillContainerFor(container)
}

function addWaypoint(player, pos, name, color) {
  return player.sendData('darkages:waypoints', {
    pos: { x: pos.x, y: pos.y, z: pos.z },
    name: name,
    color: color
  })
}

function isModLoaded(modName) {
  return Platform.isLoaded(modName)
}

function listMods() {
  let mods = []
  Platform.getMods().forEach(mod => {
    mods.push(mod.toString())
  })
  mods.sort()
  let jsonContent = { mods: mods }
  JsonIO.write('kubejs/config/modlist.json', jsonContent)
  return;
}

function playerKey(player) {
  var raw = player.stringUuid;
  var digitsOnly = raw.replace(/[^0-9]/g, "");
  return digitsOnly.slice(0, 5);
}

function intArrayToUuid(arr) {
  let hex = arr.map(i => {
    let h = (i >>> 0).toString(16);
    return h.padStart(8, "0");
  });

  return (
    hex[0].slice(0, 8) + "-" +
    hex[1].slice(0, 4) + "-" +
    hex[1].slice(4, 8) + "-" +
    hex[2].slice(0, 4) + "-" +
    hex[2].slice(4, 8) + hex[3]
  );
}

function capitalize(value) {
  let str = String(value);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeHarmfulEffects(player) {
  let toRemove = [];

    player.getActiveEffects().forEach(effect => {
        let mobEffect = effect.effect;
        if (!mobEffect.isBeneficial()) {
            toRemove.push(mobEffect);
        }
    });

    toRemove.forEach(mobEffect => {
        player.removeEffect(mobEffect);
    });
}

function logObject(object) {
  let objects = [];
  if (Object.keys.length < 1) {
    return console.log('[LOGGER] NO KEYS AVAILABLE for: ' + object)
  }
  // Object.keys(object).forEach(key => {
  //   objects.push(`${key}`);
  // })
  // return console.log(objects.join(','));
  return console.log(Object.keys(object))
}

function syncVariable(player, varName, varValue) {
  const data = {};
  data[varName] = varValue;

  return player.sendData('darkages:sync_variables', data);
}

function applyLevelBasedRarity(itemStack, player, rarityLevel) {
  let rarityList = $RarityRegistry.INSTANCE.getOrderedRarities();

  console.log(`[RECEIVED ITEM]: ${itemStack}`)

  let level = player.persistentData.level ?? 0;
  let rarityIndex = rarityLevel

  console.log(`[RARITY INDEX] for ${player.username} ${level} is ${rarityIndex}`)

  rarityIndex = Math.min(rarityIndex, rarityList.size()) + 1;

  console.log(`[FINALIZED RARITY INDEX] ${rarityIndex}`)

  let rarity = rarityList.get(rarityIndex).value();

  console.log(`[RARITY GENERATED] ${rarity}`)

  let newStack = $LootController.createLootItem(
    itemStack.item,
    rarity,
    player.level.random
  );

  console.log(`[NSTACK GENERATED] ${newStack}`)

  newStack.setNbt(newStack.nbt.merge({
    rarity: rarity.toString().match(/LootRarity\{(?:.+):(.+)\}/)[1]
  }));

  console.log(`[NSTACK NBT] ${newStack.nbt}`)

  return newStack;
}

const $Season = Java.loadClass('com.teamtea.eclipticseasons.api.EclipticSeasonsApi').getInstance();

function getSeason(player) {
  return $Season.getAgroSeason(player.level, player.blockPosition());
}

// CURIOS HANDLERS

const CuriosCapability = Java.loadClass('top.theillusivec4.curios.api.CuriosCapability');

function getCurioSlot(player, slotType) {
  let cap = player.getCapability(CuriosCapability.INVENTORY, null);
  if (!cap.isPresent()) return null;

  let curios = cap.resolve().get();
  let handlerOpt = curios.getStacksHandler(slotType);
  if (!handlerOpt.isPresent()) return null;

  return handlerOpt.get();
}

function removeStolenFromItemStack(stack, player) {
  let nbt = stack?.nbt;
  if (!nbt?.Inventory?.Items) return;

  let items = nbt.Inventory.Items;

  items.forEach(item => {
    if (item.tag?.Stolen) {
      item.id = "minecraft:air";
      item.Count = 0;
      delete item.tag;
    }
  });

  stack.setNbt(nbt);
}