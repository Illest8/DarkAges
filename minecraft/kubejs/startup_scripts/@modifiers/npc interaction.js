const $Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const npcs = [
    'darkages:blacksmith',
    'darkages:general',
    'darkages:guard',
    'darkages:friar',
    'darkages:merchant',
    'darkages:noble',
    'darkages:priestess',
    'darkages:wise_man',
    'darkages:woman'
]
ForgeEvents.onEvent("net.minecraftforge.client.event.InputEvent$InteractionKeyMappingTriggered", event => {
    let mc = $Minecraft.getInstance();
    let player = Client.player

    if (!event.isUseItem()) return;

    let target = mc.crosshairPickEntity;
    if (!target) return;

    if (!npcs.some(npc => npc.includes(target.getType()))) {
        return;
    }

    event.setCanceled(true);

    player.sendData('darkages:check_combat', {
        id: target.getStringUuid()
    })
});