BlockEvents.broken(event => {
    const { block, level, player } = event
    if (!player || player.isCreative()) return

    if (isInStructure(player, 'darkages:overworld/prison')) {
        if (block.id !== 'minecraft:stone') {
            event.cancel()
            return
        }

        let x = block.x, y = block.y, z = block.z

        event.server.scheduleInTicks(40, () => {
            let pos = BlockPos(x, y, z)
            if (!level.isLoaded(pos)) return

            let target = level.getBlock(pos)
            if (target.id === 'minecraft:air') {
                target.set('minecraft:stone')
            }
        })
    }
})

BlockEvents.rightClicked('iceandfire:lectern', event => {
    const { player, block } = event
    if (isInStructure(player, 'darkages:overworld/prison') && !player.isCreative()) {
        player.server.runCommandSilent(`openguiscreen prison_quest ${player.username}`)
        event.cancel()
    }
})

BlockEvents.rightClicked('create:placard', event => {
    let { item, player } = event;
    if (!isInStructure(player, 'darkages:overworld/prison')) return;
    if (player.mainHandItem.id == 'supplementaries:key') {
        player.mainHandItem.count--
    }
})

//

// const COOLDOWN_DAYS = 2
// const TICKS_PER_DAY = 24000

// BlockEvents.rightClicked('darkages:statue', event => {
//     const player = event.player
//     if (isInStructure(player, 'darkages:overworld/prison') && !questCompleted(player, '257816016A6B5EC7')) {
//         completeQuest(player, '1AD6A6FA2DFBB9B2')
//         player.server.runCommandSilent(`openguiscreen powers ${player.username}`)
//     }

//     const block = event.block
//     const be = block.entity
//     if (!be) return

//     if (event.hand != 'main_hand') return;

//     const now = player.level.getTime()
//     const uuid = player.username

//     let usesTag = be.persistentData.uses
//     if (!usesTag) {
//         usesTag = {}
//         be.persistentData.uses = usesTag
//     }

//     const lastUse = usesTag[uuid] || 0

//     if (lastUse > 0) {
//         const daysPassed = (now - lastUse) / TICKS_PER_DAY
//         if (daysPassed < COOLDOWN_DAYS) {
//             player.tell(`The statue is dormant for you. Try again in ${Math.ceil(COOLDOWN_DAYS - daysPassed)} day(s).`)
//             return
//         }
//     }

//     usesTag[uuid] = now
//     be.persistentData.uses = usesTag
//     player.server.runCommandSilent(`openguiscreen powers ${player.username}`)
//     player.server.runCommandSilent(`bodydamage ${player.username} heal ALL 10`)
//     player.heal(player.getMaxHealth())
//     player.sendData('darkages:sound', {
//         sound: 'darkages:successful_hit'
//     })
//     player.tell(Text.white('All ailments cured.'))
// })