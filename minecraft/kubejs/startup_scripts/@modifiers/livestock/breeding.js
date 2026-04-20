
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.BabyEntitySpawnEvent", event => global.spawnBaby(event))

/**
 * @param {Internal.BabyEntitySpawnEvent_} event
 */
global.spawnBaby = event => {
    let { child, parentA, parentB } = event

    let ownerA = parentA.persistentData.isOwner
    let ownerB = parentB.persistentData.isOwner

    if (ownerA) {
        child.persistentData.isOwner = ownerA
    } else if (ownerB) {
        child.persistentData.isOwner = ownerB
    } else {
        /** @type {Internal.ServerPlayer} */
        let loveCauseA = parentA.getLoveCause()
        /** @type {Internal.ServerPlayer} */
        let loveCauseB = parentB.getLoveCause()

        let breeder = loveCauseA ?? loveCauseB
        if (breeder) {
            child.persistentData.isOwner = breeder.username
        }
    }
}