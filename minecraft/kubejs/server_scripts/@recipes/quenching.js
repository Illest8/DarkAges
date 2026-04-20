BlockEvents.rightClicked(event => {
    if (event.hand != 'main_hand') return;
    let block = event.block;
    let player = event.player;
    let item = player.mainHandItem

    if (block.id != 'irons_spellbooks:alchemist_cauldron') return;

    if (!item?.nbt?.Heated) return;
    if (item.id.includes('ingot')) return;

    let blockData = block.getEntityData();
    let ink = blockData.Results[0]?.FluidName;
    if (!ink) return;

    let nbt = item.nbt;

    if (ink.toString().split(':')[0] == 'irons_spellbooks') {
        let inkRarities = {
            1: 'common_ink',
            2: 'uncommon_ink',
            3: 'rare_ink',
            4: 'epic_ink',
            5: 'legendary_ink'
        }
        let inkLevel = null;

        for (let level in inkRarities) {
            if (ink.toString().split(':')[1] == inkRarities[level]) {
                inkLevel = Number(level);
                break;
            }
        }

        if (inkLevel) {
            nbt = nbt.merge({
                Damage: 0,
                "irons_spellbooks:spell_container": {
                    data: [
                        {
                            id: getRandomSpell(),
                            index: 0,
                            level: inkLevel
                        }
                    ],
                    maxSpells: 1,
                    mustEquip: 0,
                    spellWheel: 1
                }
            });
        }
    }

    else if (ink.toString().split(':')[0] == 'darkages') {
        let oils = global.oils;

        let oil = oils.find(o => `darkages:${o.name}_fluid` === ink.toString());
        if (!oil) return;

        nbt = nbt.merge({
            Damage: 0,
            Oils: [{
                Oil: capitalize(oil.name),
                Uses: oil.uses
            }]
        });
    }

    nbt.remove('Heated');

    reduceFluid(block.entity);

    player.level.spawnParticles(
        'subtle_effects:smoke 1 0 0 1',
        true,
        block.x + 0.5,
        block.y + 1.2,
        block.z + 0.5,
        0.5,
        0.02,
        0.5,
        30,
        0.15
    );

    // player.server.runCommandSilent(`indestructible ${player.username} play "epicfight:biped/combat/mob_throw" 0 1`);

    player.sendData('darkages:sound', {
        sound: 'minecraft:block.fire.extinguish'
    });
})

function reduceFluid(blockEntity) {
    let handler = blockEntity.fluidInventory;
    let fluidStack = handler.getFluidInTank(0);
    let amount = fluidStack.getAmount();

    fluidStack.setAmount(amount - 250);
    blockEntity.setChanged();
}