// priority: 998
const ModFTBChunks = isModLoaded('ftbchunks');

const $FTBChunksAPI = Java.loadClass('dev.ftb.mods.ftbchunks.api.FTBChunksAPI');

FTBChunksEvents.before('claim', event => {
  const level = event.level;
  const blockPos = event.claimPos;

  if (event.player.isCreative()) return;

  const structures = getStructuresAtPos(level, blockPos);

  if (structures.length > 0 && !structures.toString().includes('mineshaft')) {
    event.player.tell(Text.red('Claim is too close to structure.'));
    event.setCustomResult(false)
  }
  if (!questCompleted(event.player, '7240846878A25F17')) {
    completeQuest(event.player, '7240846878A25F17');
  }
});

BlockEvents.placed('darkages:statue_banner', event => {
  const { block, player } = event;
  const blockChunk = $ChunkPos(block.pos);

  const claim = $FTBChunksAPI.api();
  const manager = claim.manager;

  let claimPos = getChunkDimPos(block.level, block.pos);

  let chunk = manager.getChunk(claimPos);

  if (chunk != null) {
    player.tell('This chunk is claimed')
    event.cancel();
  }

  claim.claimAsPlayer(player, block.level.getDimensionKey(), blockChunk, false)
});

BlockEvents.broken('darkages:statue_banner', event => {
  const { block, player } = event;

  const manager = $FTBChunksAPI.api().manager;

  const claimPos = getChunkDimPos(block.level, block.pos)

  let chunk = manager.getChunk(claimPos);

  if (chunk != null) {
    const now = Date.now()

    let threshold = now - chunk.getTimeClaimed()
    if (threshold > 360000) {
      player.tell("This claim is older than 1 hour and cannot be removed.");
      event.cancel();
    }
    chunk.unclaim(player.createCommandSourceStack(), true)
    return;
  }
});

function getClaimedChunksForPlayer(player) {
  const ClaimManager = $FTBChunksAPI.api().manager;
  const teamId = getTeamId(player);
  const results = [];

  ClaimManager.getClaimedChunksByTeam(claimedChunk => {
    const chunkTeamId = claimedChunk.getTeamData().teamId;

    if (chunkTeamId == teamId) {
      results.push(claimedChunk.getPos().getChunkPos());
      return true;
    }

    return false;
  });

  return results;
}

function ownedChunk(player, pos) {
  if (player.isCreative()) return true;
  const playerChunks = getClaimedChunksForPlayer(player);
  const blockChunk = $ChunkPos(pos);

  return playerChunks.some(c => c.x === blockChunk.x && c.z === blockChunk.z);
}

function getChunkDimPos(level, pos) {
  const $ChunkDimPos = Java.loadClass('dev.ftb.mods.ftblibrary.math.ChunkDimPos');

  const dim = level.getDimensionKey();
  const x = pos.x >> 4;
  const z = pos.z >> 4;

  return new $ChunkDimPos(dim, x, z);
};