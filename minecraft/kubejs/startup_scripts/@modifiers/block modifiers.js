
BlockEvents.modification(event => {
  function breakSpeed(b, s) {
    event.modify(b, block => { block.destroySpeed = s })
  }

  let createMod = Ingredient.of(/create:/).itemIds
  createMod.forEach(itemId => {
    breakSpeed(itemId, -1)
  })

  // let stoneItems = Ingredient.of(/stone/).itemIds
  // stoneItems.forEach(stone => {
  //   breakSpeed(stone, 7.0)
  // })

  // let logItems = Ingredient.of(/_log/).itemIds
  // logItems.forEach(log => {
  //   breakSpeed(log, 12.0)
  // })


  let vitalHerbs = [
    "vital_herbs:sooth_blossom_plant",
    "vital_herbs:bleeding_heart_plant",
    "vital_herbs:blue_spar_plant",
    "vital_herbs:burst_bud_plant",
    "vital_herbs:dried_glow_leaf_plant",
    "vital_herbs:crimson_lily_plant",
    "vital_herbs:fizz_fruit_plant",
    "vital_herbs:frost_mint_plant",
    "vital_herbs:glow_leaf_plant",
    "vital_herbs:tox_kiss_plant",
    "vital_herbs:snap_pepper_plant",
    "vital_herbs:razor_leaf_plant",
    "vital_herbs:needle_heart_plant",
    "vital_herbs:mourning_bloom_plant",
    "vital_herbs:iron_root_plant",
    "minecraft:spawner"
  ]

  vitalHerbs.forEach(herb => {
    breakSpeed(herb, -1)
  })

  breakSpeed('bountiful:bountyboard', -1)
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$RightClickBlock', event => {
  // if (event.side.server) return;
  let player = event.entity
  let item = event.itemStack
  if (item.id.includes('torch') || item.id.includes('sconce')) {
    let epicfightMode =getPlayerMode(player)
    if (epicfightMode == 'EPICFIGHT') {
      event.setCanceled(true)
    }
    else if (epicfightMode == 'VANILLA' && !player.isCrouching()) {
      event.setCanceled(true)
    }
  }
})

let lastCooldownTimestamp = 0;

let blacklistJade = [
  'ftbquests:barrier'
]

ForgeEvents.onEvent('net.minecraftforge.client.event.InputEvent$MouseButton$Pre', event => {
  if (event.getButton() == 2 && event.getAction() == 1) {
    let player = Client.player;
    if (player.isCreative()) return;

    let hit = Client.hitResult;
    if (hit && hit.getType() == 'BLOCK') {
      let pos = hit.getBlockPos();
      let block = player.level.getBlockState(pos).getBlock();

      if (block.getId().includes(blacklistJade)) return;

      if (block.getId().includes('copycat')) {
        let copycatBlock = block.getCopycatBlockEntity(player.level, pos);
        block = copycatBlock.getMaterial().block;
      }

      if (block.getId().includes('simplytents')) {
        $VariableHandler.setVariable('jadeItem', 'simplytents:tent');
        $VariableHandler.setVariable('jadeName', 'Tent');
      }
      else {
        $VariableHandler.setVariable('jadeItem', block.getId());
        $VariableHandler.setVariable('jadeName', block.getName().getString());
      }

      lastCooldownTimestamp = Date.now();

      let thisClickTimestamp = lastCooldownTimestamp;

      Client.scheduleInTicks(60, () => {
        let now = Date.now();

        if (now - thisClickTimestamp >= 100 &&
          thisClickTimestamp === lastCooldownTimestamp) {

          $VariableHandler.setVariable('jadeItem', 0);
          $VariableHandler.setVariable('jadeName', 0);
        }
      });
    }
  }
});