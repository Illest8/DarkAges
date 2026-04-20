const $ServerLevel = Java.loadClass("net.minecraft.server.level.ServerLevel");
const $StructurePieceSerializationContext = Java.loadClass("net.minecraft.world.level.levelgen.structure.pieces.StructurePieceSerializationContext");
const $ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos");
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos')

const structures_no_break = [
  "supplementaries:way_sign",
  "minecraft:village_plains",
  "darkages:overworld/solen",
  "darkages:overworld/nord_hall",
  "darkages:overworld/verden",
  "darkages:overworld/thalor",
  "darkages:overworld/aurelith",
  "irons_spellbooks:evoker_fort",
  "irons_spellbooks:mountain_tower",
  "irons_spellbooks:pyromancer_tower",
  "cataclsym:acropolis",
  "cataclysm:cursed_pyramid",
  "cataclysm:frosted_prison",
  "cataclysm:sunken_city"
];

const structures_with_laws = [
  "minecraft:village_plains",
  "darkages:overworld/solen",
  "darkages:overworld/verden"
];

const captured_fort = [
  "darkages:overworld/bandit_captured_fort"
]

const prison_structure = [
  "darkages:overworld/prison"
];

BlockEvents.placed(event => {
  let { player, block } = event;
  if (player) {
    if (block.id.includes('chest') && ownedBuilding(player)) {
      if (getBuildingBlock(player, 'lootr:lootr_chest') == false) {
        let facing = block.getProperties().facing;

        block.set(`lootr:lootr_chest`, { facing: facing });

        block.setEntityData(`{LootTable: "minecraft:chests/village/village_${getTownBuilding(player, player.blockPosition()).getType()}"}`)
        refreshBuilding(getTownBuilding(player, player.blockPosition()), player.level);
      }
    }
    if (ownedChunk(player, block.pos)) return;
    let building = getTownBuilding(player, block.pos)
    if (building != false) {
      if (building.getId() == playerKey(player)) return;
    }
  }
  if (block.id == 'supplementaries:rope' || block.id == 'supplementaries:rope_knot' || block.id == 'supplementaries:rope_buntings' || block.id.includes('travelers') || block.id.includes('powder_snow')) return
  if (getStructuresAtPos(block.level, block.pos).some(id => structures_no_break.includes(id))) event.cancel()
})

BlockEvents.rightClicked(event => {
  let { player, block } = event;

  if (block.entityData && block.entityData.OwnerUUID) {
    if (intArrayToUuid(block.entityData.OwnerUUID) == player.getUuid()) {
      return;
    }
  }

  if (player) {
    if (ownedChunk(player, block.pos)) return;
    let building = getTownBuilding(player, block.pos)
    if (building) {
      if (building.getId() == playerKey(player)) return;
      // if (isSameTeam(getTownBuilding(player, block.pos).getType(), player.stringUuid)) return;
    }
  }

  if (isInLawStructure(player)) {
    if (getTown(player)) {
      if (getTownBuilding(player, block.pos) && getTownBuilding(player, block.pos).getType() == 'temple') {
        event.cancel()
      }
    }

    if (/minecraft:.*_bed/.test(block.id)) {
      let buildingType = getTownBuilding(player, block.pos).getType()

      if (buildingType === 'inn') {
        return;
      }

      player.tell(Text.of('This bed does not belong to you.').red().italic())
      event.cancel()
    }
  }
})

BlockEvents.broken(event => {
  let { player, block } = event;

  if (player) {
    if (ownedChunk(player, block.pos)) return;
    if (getTownBuilding(player, block.pos)) {
      if (getTownBuilding(player, block.pos).getId() == playerKey(player)) return;
    }
  }
  if (block.id == 'supplementaries:rope' || block.id == 'supplementaries:rope_knot' || block.id == 'supplementaries:rope_buntings' || block.id.includes('travelers')) return
  if (getStructuresAtPos(block.level, block.pos).some(id => structures_no_break.includes(id)))
    event.cancel();
});

function isInAdventureStructure(entity) {
  return getStructuresAtPos(entity.level, entity.blockPosition())
    .some(id => structures_no_break.includes(id));
}

function isInLawStructure(entity) {
  return getStructuresAtPos(entity.level, entity.blockPosition())
    .some(id => structures_with_laws.includes(id));
}

function isInStructure(player, structureId) {
  return getStructuresAtPos(player.level, player.blockPosition()).includes(structureId);
}

function getStructureCenter(level, block_pos) {
  if (!(level instanceof $ServerLevel)) {
    return null;
  }

  let structure_manager = level.structureManager();
  let structures = structure_manager.getAllStructuresAt(block_pos);

  for (let entry of structures.entrySet()) {
    let structure = entry.getKey();
    let longSet = entry.getValue();

    let structure_start = structure_manager.getStructureAt(block_pos, structure);
    if (!structure_start || !structure_start.isValid()) continue;

    let center = structure_start.getBoundingBox().getCenter();

    return {
      x: center.x,
      y: center.y,
      z: center.z
    };
  }

  return null;
}

function getStructuresAtPos(level, block_pos) {
  if (!(level instanceof $ServerLevel)) {
    return [];
  }

  let structures_list = [];
  let structure_manager = level.structureManager();
  let chunk_pos = new $ChunkPos(block_pos);
  let serialization = $StructurePieceSerializationContext.fromLevel(level);

  let structures = structure_manager.getAllStructuresAt(block_pos);
  structures.forEach((structure, long_set) => {
    let structure_start = structure_manager.getStructureAt(block_pos, structure);
    if (structure_start) {
      let structure_id = structure_start.createTag(serialization, chunk_pos)
        .get('id').toString().replace('"', '');
      structures_list.push(structure_id);
    }
  });

  return structures_list;
}

BlockEvents.rightClicked(event => {
  let { block, player } = event;
  if (player.isCreative()) return;
  if (block.entityData && block.entityData.OwnerUUID) {
    if (intArrayToUuid(block.entityData.OwnerUUID) == player.getUuid()) {
      return;
    }
  }
  if (block.id.includes('simplytents') && (isInAdventureStructure(player) || isInLawStructure(player))) {
    event.cancel()
  }
})