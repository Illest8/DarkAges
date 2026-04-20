// events/registry.js

global.DailyEventPool = [
    // {
    //     id: 'prisonLooseGrate',
    //     weight: 10,
    //     condition: (server, player) => {
    //         return isInStructure(player, 'darkages:overworld/prison') && $check('quest', '2A2C195CAAA89F4F', true)
    //     },
    //     run: (server, player) => {
    //         completeQuest(player, '2A2C195CAAA89F4F')
    //     }
    // },
    {
        id: 'test',
        weight: 3,
        condition: (server, player) => {
            return getAssassinations(player) > 5
        },
        run: (server, player) => {
            player.tell('Assassination event triggered!')
            spawnAroundPlayer(player, 'darkages:thief', 3)
        }  
    },
    {
        id: 'orcArmyPortal',
        weight: 10,
        condition: (server, player) => {
            return $check('dataHigher', player, 'level', 10)
        },
        run: (server, player) => {
            openGateway(player, 'orc_army')
        }
    },
    {
        id: 'vikingRaidPortal',
        weight: 10,
        condition: (server, player) => {
            return $check('dataHigher', player, 'level', 5) && $check('structure', player, 'minecraft:village_plains')
        },
        run: (server, player) => {
            spawnRaiders(player, getTown(player), 'east', 3)
            player.sendData('darkages:sound', {
                sound: 'minecraft:item.goat_horn.sound.7'
            })
            player.tell('Raiders approach from the East.')
        }
    },
    {
        id: 'draugrRaid',
        weight: 3,
        condition: (server, player) => {
            return $check('structure', player, 'darkages:overworld/verden') && $check('dataHigher', player, 'level', 0) && server.persistentData.attrition
        },
        run: (server, player) => {
            openGateway(player, 'draugr_raid')
            spawnAroundPlayer(player, 'darkages:knight', 2)
            player.tell(`Knights >> For Verden!`)
        }
    },
    {
        id: 'merchantSpirit',
        weight: 1,
        condition: (server, player) => {
            return !isInAdventureStructure(player)
        },
        run: (server, player) => {
            openGateway(player, 'spirit_merchant')
        }
    },
    {
        id: 'deeplingAttack',
        weight: 10,
        condition: (server, player) => {
            return $check('structure', player, 'darkages:overworld/thalor')
        },
        run: (server, player) => {
            spawnAroundPlayer(player, 'cataclysm:deepling', 1)
        }
    },
    {
        id: 'giftHerbs',
        weight: 1,
        condition: (server, player) => {
            return $check('structure', player, 'darkages:overworld/solen') || $check('structure', player, 'minecraft:village_plains')
        },
        run: (server, player) => {
            player.give(Item.of('legendarysurvivaloverhaul:healing_herbs', 1));
            player.tell(Text.of('The nearby Solen abbey has gifted you some herbs.').green().italic());
        }
    }
];