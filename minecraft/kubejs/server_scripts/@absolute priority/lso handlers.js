const $CapabilityUtil = Java.loadClass('sfiomn.legendarysurvivaloverhaul.util.CapabilityUtil')

const $BodyPartEnum = Java.loadClass('sfiomn.legendarysurvivaloverhaul.api.bodydamage.BodyPartEnum')

function getBodyHealth(player, partName) {
    const cap = $CapabilityUtil.getBodyDamageCapability(player)
    // logObject(cap)
    if (!cap) return 0

    const enumKey = partName.trim().toUpperCase()

    const limb = $BodyPartEnum[enumKey]
    if (!limb) {
        console.log("Invalid body part:" + partName)
        return 0
    }

    return cap.getBodyPartHealthRatio(limb)
}

function addBodyDamage(player, partName, amount) {
    const cap = $CapabilityUtil.getBodyDamageCapability(player);
    if (!cap) return 0

    const enumKey = partName.trim().toUpperCase()

    const limb = $BodyPartEnum[enumKey]
    if (!limb) {
        console.log("Invalid body part:" + partName)
        return 0
    }

    let limbHealth = cap.getBodyPartDamage(partName)
    let calc = limbHealth - amount

    return cap.setBodyPartDamage(limb, calc)
}