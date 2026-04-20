const $ServerLevel = Java.loadClass("net.minecraft.server.level.ServerLevel");
const $StructurePieceSerializationContext = Java.loadClass("net.minecraft.world.level.levelgen.structure.pieces.StructurePieceSerializationContext");
const $ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos");

const structures_no_break = [
    "darkages:overworld/prison",
    "supplementaries:way_sign",
    "minecraft:village_plains",
    "darkages:overworld/solen",
    "darkages:overworld/nord_hall",
    "irons_spellbooks:evoker_fort",
    "irons_spellbooks:mountain_tower",
    "irons_spellbooks:pyromancer_tower"
];

const structures_with_laws = [
    "minecraft:village_plains",
    "darkages:overworld/solen"
];

const prison_structure = [
    "darkages:overworld/prison"
];

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

function isInPrison(entity) {
    return getStructuresAtPos(entity.level, entity.blockPosition())
        .some(id => prison_structure.includes(id));
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
