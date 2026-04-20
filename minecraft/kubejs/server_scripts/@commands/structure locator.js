// ------------------------------------------------------
// Load cache on world load
// ------------------------------------------------------
let CACHE_READY = false;

ServerEvents.loaded(event => {
  let server = event.server;

  try {
    loadPersistentIntoMemory(server);
    console.log("[CACHE DEBUG] quest structure cache initialized for world: " + server.getWorldData().levelName);
  } catch (e) {
    console.log("[CACHE DEBUG] failed to initialize cache: " + e);
  }
});

// ------------------------------------------------------
// Config
// ------------------------------------------------------
function questCachePath(server) {
  return "saves/" + server.getWorldData().levelName + "/serverconfig/quest_structures_cache.json";
}

var MAX_DISTANCE_BLOCKS = 5000;

var CHUNK_CACHE = {};

var QUEST_STRUCTURES = {
  ancient_library: 'Ancient Library',
  aurelith: 'Aurelith',
  evoker_fort: 'Evoker Fort',
  frosted_prison: 'Frosted Prison',
  town: 'Town',
  fortress: 'Fortress',
  solen: 'Solen',
  thalor: 'Thalor',
  verden: 'Verden',
  orc_camp: 'Orc Camp',
  bandit_captured_fort: 'Captured Fort',
  eroded_castle: 'Eroded Castle',
  viking_town: 'Viking Town'
};

// ------------------------------------------------------
// Per‑structure waypoint colors
// ------------------------------------------------------
var QUEST_COLORS = {
  ancient_library: 0x005F7F,
  aurelith: 0x005F7F,
  evoker_fort: 0xAA00FF,
  frosted_prison: 0x55CCFF,
  town: 0x00AA00,
  fortress: 0xAA0000,
  solen: 0xFF5500,
  thalor: 0x00AAAA,
  verden: 0x228B22,
  orc_camp: 0x556B2F,
  bandit_captured_fort: 0x8B4513,
  eroded_castle: 0x808080,
  viking_town: 0x1E90FF
};

// ------------------------------------------------------
// Cache read/write
// ------------------------------------------------------
function readCacheFile(server) {
  try {
    let path = questCachePath(server);
    return JsonIO.read(path) || {};
  } catch (e) {
    return {};
  }
}

function writeCacheFile(server, obj) {
  try {
    let path = questCachePath(server);
    JsonIO.write(path, obj);
    return true;
  } catch (e) {
    return false;
  }
}

function ensureCacheLoaded(server) {
  if (!CACHE_READY) {
    console.log("[CACHE DEBUG] lazy reload after /reload");
    loadPersistentIntoMemory(server);
    CACHE_READY = true;
  }
}

function loadPersistentIntoMemory(server) {
  try {
    let persisted = readCacheFile(server) || {};
    CHUNK_CACHE = {};

    for (let k in persisted) {
      let entry = persisted[k];
      if (!entry || !entry.pos) continue;

      let x = Math.floor(Number(entry.pos.x || 0));
      let z = Math.floor(Number(entry.pos.z || 0));

      CHUNK_CACHE[k] = { pos: { x: x, z: z } };
    }

    CACHE_READY = true;

    console.log('[CACHE DEBUG] loaded ' + Object.keys(CHUNK_CACHE).length + ' entries');
  } catch (e) {
    console.log('[CACHE DEBUG] loadPersistentIntoMemory failed: ' + e);
  }
}

function persistDump(server) {
  try {
    if (!CACHE_READY) {
      console.log("[CACHE DEBUG] persistDump skipped — cache not ready");
      return;
    }

    if (Object.keys(CHUNK_CACHE).length === 0) {
      console.log("[CACHE DEBUG] persistDump skipped — cache empty");
      return;
    }

    let dump = {};
    let ks = Object.keys(CHUNK_CACHE);

    for (let i = 0; i < ks.length; i++) {
      let k = ks[i];
      let e = CHUNK_CACHE[k];
      if (!e) continue;

      dump[k] = {
        pos: {
          x: Math.floor(Number(e.pos.x)),
          z: Math.floor(Number(e.pos.z))
        }
      };
    }

    writeCacheFile(server, dump);
  } catch (e) {
    console.log('[CACHE DEBUG] persistDump failed: ' + e);
  }
}

function makeCacheKey(server, namespace, structureId, pos) {
  let x = (typeof pos.getX === 'function') ? pos.getX() : pos.x;
  let z = (typeof pos.getZ === 'function') ? pos.getZ() : pos.z;
  return namespace + ':' + structureId + ':' + x + ':' + z;
}

function keepLocationCached(server, namespace, structureId, blockPos) {
  try {
    let bx = (typeof blockPos.getX === 'function')
      ? Math.floor(blockPos.getX())
      : Math.floor(Number(blockPos.x));

    let bz = (typeof blockPos.getZ === 'function')
      ? Math.floor(blockPos.getZ())
      : Math.floor(Number(blockPos.z));

    let key = makeCacheKey(server, namespace, structureId, { x: bx, z: bz });

    CHUNK_CACHE[key] = { pos: { x: bx, z: bz } };

    persistDump(server);
    return true;
  } catch (e) {
    console.log('[CACHE DEBUG] keepLocationCached failed: ' + e);
    return false;
  }
}

function getAllCachedForStructure(structureId) {
  let results = [];
  for (let key in CHUNK_CACHE) {
    if (key.includes(':' + structureId + ':')) {
      results.push(CHUNK_CACHE[key]);
    }
  }
  return results;
}

function debugPrintCacheState(player, structureId) {
  try {
    if (!player || !player.isCreative || !player.isCreative()) return;

    let px = Math.floor(player.x);
    let pz = Math.floor(player.z);
    let list = getAllCachedForStructure(structureId);

    console.log('[CACHE DEBUG] playerPos=' + px + ',' + pz +
      ' cachedCount=' + list.length +
      ' structure=' + structureId);
  } catch (e) { }
}

function computeSurfacePos(level, foundPos, BlockPosClass) {
  try {
    let bx = (typeof foundPos.getX === 'function') ? foundPos.getX() : Math.floor(Number(foundPos.x));
    let bz = (typeof foundPos.getZ === 'function') ? foundPos.getZ() : Math.floor(Number(foundPos.z));
    let base = new BlockPosClass(bx, 0, bz);

    let HeightmapTypes = null;
    try { HeightmapTypes = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Type'); } catch (e) { HeightmapTypes = null; }

    let surfacePos;
    if (HeightmapTypes && HeightmapTypes.MOTION_BLOCKING_NO_LEAVES) {
      surfacePos = level.getHeightmapPos(HeightmapTypes.MOTION_BLOCKING_NO_LEAVES, base);
    } else {
      surfacePos = level.getHeightmapPos('motion_blocking_no_leaves', base);
    }

    if (surfacePos && surfacePos.getY && surfacePos.getY() <= -64) {
      let maxY = level.getMaxBuildHeight();
      for (let y = maxY - 1; y > -64; y--) {
        let pos = new BlockPosClass(bx, y, bz);
        let state = level.getBlockState(pos);
        let isAir = (typeof state.isAir === 'function') ? state.isAir() : !!state.is_air;
        let isLiquid = false;
        if (typeof state.isLiquid === 'function') isLiquid = state.isLiquid();
        else if (typeof state.liquid === 'function') isLiquid = state.liquid();
        if (!isAir && !isLiquid) { surfacePos = pos.above(); break; }
      }
    }

    return surfacePos;
  } catch (e) { return null; }
}

function centerOfChunk(pos) {
  let x = (typeof pos.getX === 'function') ? pos.getX() : pos.x;
  let z = (typeof pos.getZ === 'function') ? pos.getZ() : pos.z;
  return {
    x: (Math.floor(x / 16) * 16) + 8,
    z: (Math.floor(z / 16) * 16) + 8
  };
}

function createWaypoint(player, displayName, pos, colorHex) {
  let x = (typeof pos.getX === 'function') ? pos.getX() : pos.x;
  let y = (typeof pos.getY === 'function') ? pos.getY() : pos.y;
  let z = (typeof pos.getZ === 'function') ? pos.getZ() : pos.z;

  let cleaned = colorHex.toString().replace(/^#|0x/i, '');

  let colorDec = parseInt(cleaned, 16);

  player.sendData('darkages:sound', {
    sound: 'minecraft:block.amethyst_block.step'
  })

  addWaypoint(player, { x: x, y: y, z: z }, displayName, colorDec);
}

function startAsyncLocate(player, structure) {

  if (!isModLoaded('asynclocator')) {
    return player.tell(Text.of('AsyncLocator is not downloaded on this pack! Quest location finders have been disabled.').red());
  }

  ensureCacheLoaded(player.server);

  debugPrintCacheState(player, structure);

  let cachedList = getAllCachedForStructure(structure);

  if (cachedList.length > 0) {
    let closest = null;
    let closestDist = Infinity;

    for (let entry of cachedList) {
      let dx = player.x - entry.pos.x;
      let dz = player.z - entry.pos.z;
      let dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < closestDist) {
        closestDist = dist;
        closest = entry;
      }
    }

    if (closest && closestDist <= MAX_DISTANCE_BLOCKS) {
      let BlockPosClassCached = Java.loadClass('net.minecraft.core.BlockPos');

      let centered = centerOfChunk(closest.pos);
      let fakePos = {
        x: centered.x,
        z: centered.z,
        getX() { return this.x },
        getZ() { return this.z }
      };

      let surfaceCached = computeSurfacePos(player.level, fakePos, BlockPosClassCached);
      if (surfaceCached) {
        let displayNameCached = QUEST_STRUCTURES[structure] || structure;
        let color = QUEST_COLORS[structure] || 0xFFFFFF;
        createWaypoint(player, displayNameCached, surfaceCached, color);
        if (player.isCreative()) player.tell('§7Used cached location for ' + structure);
        return;
      }
    }

    if (player.isCreative()) player.tell('§7Cached locations too far or invalid — starting new locate.');
  }

  let AsyncLocator = (function () { try { return Java.loadClass('brightspark.asynclocator.AsyncLocator'); } catch (e) { return null; } })();
  let ConsumerClass = (function () { try { return Java.loadClass('java.util.function.Consumer'); } catch (e) { return null; } })();
  let BlockPosClass = (function () { try { return Java.loadClass('net.minecraft.core.BlockPos'); } catch (e) { return null; } })();
  let ResourceLocationClass = (function () { try { return Java.loadClass('net.minecraft.resources.ResourceLocation'); } catch (e) { return null; } })();
  let TagKeyClass = (function () { try { return Java.loadClass('net.minecraft.tags.TagKey'); } catch (e) { return null; } })();
  let RegistriesClass = (function () { try { return Java.loadClass('net.minecraft.core.registries.Registries'); } catch (e) { return null; } })();

  if (!AsyncLocator || !ConsumerClass || !BlockPosClass || !ResourceLocationClass || !TagKeyClass || !RegistriesClass) {
    player.tell('§cRequired server classes unavailable for async locate.');
    return;
  }

  let tagKey = TagKeyClass.create(RegistriesClass.STRUCTURE, new ResourceLocationClass('darkages', structure));
  let origin = player.blockPosition();

  let locateTask = AsyncLocator.locate(player.level, tagKey, origin, 100, false);
  if (!locateTask) { player.tell('§cAsync locate failed to start.'); return; }

  let displayName = QUEST_STRUCTURES[structure] || structure;
  let color = QUEST_COLORS[structure] || 0xFFFFFF;

  let consumer = new ConsumerClass({
    accept: function (foundPos) {
      try {
        if (foundPos == null) { player.tell('§cNo structure found nearby.'); return; }

        keepLocationCached(player.server, 'darkages', structure, foundPos);

        let centered = centerOfChunk(foundPos);
        let surfacePos = computeSurfacePos(player.level, centered, BlockPosClass);
        if (!surfacePos) { player.tell('§cError determining surface position.'); return; }
        createWaypoint(player, displayName, surfacePos, color);
      } catch (err) {
        player.tell('§cError in async locate callback.');
      }
    }
  });

  if (typeof locateTask.thenOnServerThread === 'function') {
    locateTask.thenOnServerThread(consumer);
    return;
  }

  player.tell('§cAsync locate task does not support thenOnServerThread on this server.');
}

global.startAsyncLocate = startAsyncLocate;

ServerEvents.commandRegistry(event => {
  let Commands = event.commands;
  let Arguments = event.arguments;

  event.register(
    Commands.literal('questLocation')
      .requires(s => s.hasPermission(2))
      .then(
        Commands.argument('structure', Arguments.WORD.create(event))
          .suggests((ctx, builder) => {
            for (let key in QUEST_STRUCTURES) {
              builder.suggest(key);
            }
            return builder.buildFuture();
          })
          .executes(c => {
            let player = c.source.player;
            let structure = Arguments.WORD.getResult(c, 'structure');
            startAsyncLocate(player, structure);
            return 1;
          })
      )
  );
});