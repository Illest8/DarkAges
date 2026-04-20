const $EpicFightCapabilities = Java.loadClass('yesman.epicfight.world.capabilities.EpicFightCapabilities');
const LivingData = Java.loadClass('yesman.epicfight.world.capabilities.entitypatch.LivingEntityPatch');
const $Registry = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const $VariableHandler = Java.loadClass('de.keksuccino.fancymenu.customization.variables.VariableHandler')
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority');
const $SkillSlot = Java.loadClass('yesman.epicfight.skill.SkillSlot');

function questCompleted(player, questId) {
  return FTBQuests.getServerDataFromPlayer(player).isCompleted(questId);
}

function getVariable(variable) {
  return $VariableHandler.getVariable(variable).getValue()
}

function getPlayerMode(player) {
  return $EpicFightCapabilities.getPlayerPatch(player).playerMode
}

function epicfightPatch(entity) {
  return EpicFightCapabilities.getEntityPatch(entity, LivingData)
}

function getContainer(player, slot) {
  let container = $SkillSlot.ENUM_MANAGER.getOrThrow(slot);
  return epicfightPatch(player).getSkillCapability().getSkillContainerFor(container)
}

function syncVariable(player, varName, varValue) {
  const data = {};
  data[varName] = varValue;

  return player.sendData('darkages:sync_variables', data);
}

function isModLoaded(modName) {
  return Platform.isLoaded(modName)
}

const $CapabilityUtil = Java.loadClass('sfiomn.legendarysurvivaloverhaul.util.CapabilityUtil')

const $BodyPartEnum = Java.loadClass('sfiomn.legendarysurvivaloverhaul.api.bodydamage.BodyPartEnum')

function getBodyHealth(player, partName) {
    const cap = $CapabilityUtil.getBodyDamageCapability(player)
    logObject(cap)
    if (!cap) return 0

    const enumKey = partName.trim().toUpperCase()

    const limb = $BodyPartEnum[enumKey]
    if (!limb) {
        console.log("Invalid body part:"+ partName)
        return 0
    }

    return cap.getBodyPartHealthRatio(limb)
}