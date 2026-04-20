
// REQUIRED ON BOW REGISTRY TO ADD DRAW SPEED ATTRIBUTES

const bows = [
  {
    id: 'darkages:short_bow',
    type: 'bow',
    arrowSpeed: 3,
    baseDamage: 0.6,
    fullCharge: 10,
    durability: 300,
    rarity: 'ranged'
  },
  {
    id: 'darkages:hunting_bow',
    type: 'bow',
    arrowSpeed: 4,
    baseDamage: 1.3,
    fullCharge: 40,
    durability: 300,
    rarity: 'ranged'
  },
  {
    id: 'darkages:long_bow',
    type: 'bow',
    arrowSpeed: 4,
    baseDamage: 1.2,
    fullCharge: 30,
    durability: 300,
    rarity: 'ranged'
  },
  {
    id: 'darkages:copper_longbow',
    type: 'bow',
    arrowSpeed: 4,
    baseDamage: 1.2,
    fullCharge: 30,
    durability: 300,
    rarity: 'ranged'
  },
  {
    id: 'darkages:iron_longbow',
    type: 'bow',
    arrowSpeed: 4,
    baseDamage: 1.2,
    fullCharge: 30,
    durability: 300,
    rarity: 'ranged'
  },
  {
    id: 'darkages:diamond_longbow',
    type: 'bow',
    arrowSpeed: 4,
    baseDamage: 1.2,
    fullCharge: 30,
    durability: 300,
    rarity: 'ranged'
  },
  {
    id: 'darkages:netherite_longbow',
    type: 'bow',
    arrowSpeed: 4,
    baseDamage: 1.2,
    fullCharge: 30,
    durability: 300,
    rarity: 'ranged'
  }
]

StartupEvents.registry('item', event => {
  bows.forEach(bow => {
    event.create(bow.id, bow.type).bow(b => {
      b.modifyBow(attr => {
        attr
          .arrowSpeed(bow.arrowSpeed)
          .baseDamage(bow.baseDamage)
          .fullChargeTick(bow.fullCharge)
      })
        .onUse(use => {
          use.pullTick(ev => global.bowPullEvent(ev))
        })
    })
      .rarity(bow.rarity)
      .maxDamage(bow.durability)
  })
})

ItemEvents.modification((event) => {
  const $BowItem = Java.loadClass("net.minecraft.world.item.BowItem");
  event.modify("minecraft:bow", (item) => {
    if (item instanceof $BowItem) {
      item.bow((bow) => {
        bow
          .modifyBow((attributes) => {
            attributes.fullChargeTick(30).baseDamage(1)
          })
          .onUse((use) => {
            use.pullTick((event) => { global.bowPullEvent(event) });
          });
      });
    }
  });
})

global.bowPullEvent = event => {
  {
    const { player } = event
    if (player.persistentData.identity == 'hunter') return;
    let patch = $EpicFightCapabilities.getEntityPatch(player, LivingData)
    patch.setStamina(patch.getStamina() - 0.1)
  }
}

StartupEvents.registry('item', event => {
  event.create('darkages:crossbow', 'crossbow').crossbow(crossbow => {
    crossbow
      .modifyCrossbow(attribute => {
        attribute
          .fullChargeTick(10)
      })
  })
})