const $AbstractContainerScreen = Java.loadClass(
    "net.minecraft.client.gui.screens.inventory.AbstractContainerScreen"
);

ForgeEvents.onEvent(
    "net.minecraftforge.client.event.ScreenEvent$MouseButtonPressed$Pre",
    event => {
        let screen = Client.currentScreen;
        if (!(screen instanceof $AbstractContainerScreen)) return;

        let player = Client.player;
        if (!player || player.isCreative()) return;

        let slot = screen.getSlotUnderMouse();
        if (!slot) return;

        let stack = slot.getItem();
        if (!stack || !stack.nbt) return;

        if (stack.nbt.QuestItem == true) {
            event.setCanceled(true);
            player.sendSystemMessage("You cannot move quest items.");
        }
    }
);

let $KeyInputEvent = Java.loadClass('net.minecraftforge.client.event.ScreenEvent$KeyPressed$Pre');

NativeEvents.onEvent($KeyInputEvent, event => {
    let player = Client.player;
    if (!player) return;

    let screen = Client.currentScreen;
    if (!(screen instanceof $AbstractContainerScreen)) return;


    if (event.getKeyCode() !== 81) return;

    let slot = screen.getSlotUnderMouse();
    if (!slot) return;

    let stack = slot.getItem();
    if (!stack || !stack.nbt) return;

    if (stack.nbt.QuestItem == true) {
        event.setCanceled(true);
        player.sendSystemMessage("You cannot remove quest items.");
    }
});