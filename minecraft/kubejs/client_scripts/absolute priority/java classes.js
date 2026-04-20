const $ScreenOpen = Java.loadClass('net.minecraftforge.client.event.ScreenEvent$Opening');
const $AbstractContainerScreen = Java.loadClass('net.minecraft.client.gui.screens.inventory.AbstractContainerScreen');
const $MousePressed = Java.loadClass('net.minecraftforge.client.event.ScreenEvent$MouseButtonPressed');
const $MousePressedPre = Java.loadClass('net.minecraftforge.client.event.ScreenEvent$MouseButtonPressed$Pre');

const $VariableHandler = Java.loadClass('de.keksuccino.fancymenu.customization.variables.VariableHandler')
const $EpicFightCapabilities = Java.loadClass('yesman.epicfight.world.capabilities.EpicFightCapabilities')
const $SkillSlot = Java.loadClass('yesman.epicfight.skill.SkillSlot');
const LivingEntityPatch = Java.loadClass('yesman.epicfight.world.capabilities.entitypatch.LivingEntityPatch');
const $ClientEngine = Java.loadClass('yesman.epicfight.client.ClientEngine')
const $ClientMagicData = Java.loadClass('io.redspace.ironsspellbooks.player.ClientMagicData')
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority')
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");

const ItemTooltipEvent = Java.loadClass('net.minecraftforge.event.entity.player.ItemTooltipEvent');
const EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority');
const Component = Java.loadClass('net.minecraft.network.chat.Component');
const Screen = Java.loadClass('net.minecraft.client.gui.screens.Screen');
const SwordItem = Java.loadClass("net.minecraft.world.item.SwordItem");
const BowItem = Java.loadClass('net.minecraft.world.item.BowItem')
const CrossbowItem = Java.loadClass('net.minecraft.world.item.CrossbowItem')

const $WaypointManager = Java.loadClass('dev.ftb.mods.ftbchunks.api.FTBChunksAPI');
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

function capitalize(value) {
  let str = String(value);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getContainer(player, slot) {
  let container = $SkillSlot.ENUM_MANAGER.getOrThrow(slot);
  return $EpicFightCapabilities.getEntityPatch(player, LivingEntityPatch).getSkillCapability().getSkillContainerFor(container)
}