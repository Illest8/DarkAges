

/**
 * @returns {Internal.LocalPlayerPatch}
 */
function getPlayerPatch() {
    return $ClientEngine.getInstance().getPlayerPatch();
}

let lastStamina = 0;
let lastMana = 0;
let lastTemp = 0;
ClientEvents.tick(event => {
    Client.toasts.clear();
    if (getPlayerPatch() == null) return;
    if (getPlayerPatch().epicFightMode) {
        $VariableHandler.setVariable("mode", "epicfight");
    }
    else if (!getPlayerPatch().epicFightMode) {
        $VariableHandler.setVariable("mode", "vanilla");
    }
    let stamina = getPlayerPatch().stamina / getPlayerPatch().maxStamina;
    let currentStamina = Math.floor(getPlayerPatch().stamina);
    let maxStamina = Math.round(event.player.getAttributeValue('epicfight:staminar'));
    let currentMana = Math.floor($ClientMagicData.getPlayerMana());
    let maxMana = Math.round(event.player.getAttributeValue('irons_spellbooks:max_mana'));
    let mana = currentMana / maxMana
    if (stamina != lastStamina) {
        $VariableHandler.setVariable("stamina", stamina);
        $VariableHandler.setVariable("currentStamina", currentStamina);
        $VariableHandler.setVariable("statStamina", maxStamina);
        lastStamina = stamina;
    }
    if (mana != lastMana) {
        $VariableHandler.setVariable("mana", mana);
        $VariableHandler.setVariable("currentMana", currentMana);
        $VariableHandler.setVariable("statMana", maxMana);
        lastMana = mana;
    }
    let temperature = Client.player.getNbt().getCompound('ForgeCaps').getCompound('legendarysurvivaloverhaul:temperature').getInt('temperature')
    $VariableHandler.setVariable("temperature", temperature)
    if (temperature != lastTemp) {
        let category =
            temperature <= 5 ? "freezing" :
                temperature <= 10 ? "cold" :
                    temperature <= 23 ? "fine" :
                        temperature <= 30 ? "warm" :
                            "burning";
        $VariableHandler.setVariable("tempcategory", category)
        lastTemp = temperature;
    }
})

let lastSecond = 0
ClientEvents.tick(event => {
    let time = event.level.getTime()
    if (time % 20 !== 0 || time === lastSecond) return
    lastSecond = time

    let hotbarVisible = $VariableHandler.getVariable('hotbar').value;
    if (hotbarVisible == 'true' && $VariableHandler.getVariable('hud_attributes').value == 'Off') {
        Client.scheduleInTicks(20, callback => {
            $VariableHandler.setVariable('hotbar', 'false')
        })
    }
    let stealthValue = $VariableHandler.getVariable('sneak_attack').value
    if (stealthValue > 1.0) {
        $VariableHandler.setVariable("sneak_attack", 0)
        return;
    }
    if (stealthValue > 0) {
        stealthValue++
        $VariableHandler.setVariable("sneak_attack", stealthValue)
    }
})

ClientEvents.loggedIn(event => {
    let player = Client.player;

    if ($VariableHandler.getVariable('show_stealth').value == 'Off') {
        player.sendData('player_preference', {
            stealth: "Off"
        })
    }

    let handler = getCurioSlot(player, 'back')

    if (handler == null) return;

    if (handler.getStacks().isEmpty() || handler.getStacks().getStackInSlot(0).id === 'minecraft:air') {
        $VariableHandler.removeVariable('backItem');
        $VariableHandler.removeVariable('backCount');
        $VariableHandler.setVariable('tutorial', 'guidebook');
        $VariableHandler.setVariable('sneak_attack', 0);
        $VariableHandler.setVariable('ecursor', 'none');
        return;
    }

    if (!player.tags.contains('join')) {
        $VariableHandler.setVariable('backItem', item.id)
        $VariableHandler.setVariable('backCount', item.count)
        $VariableHandler.setVariable('tutorial', 'guidebook');
        $VariableHandler.setVariable('sneak_attack', 0);
        $VariableHandler.setVariable('ecursor', 'none');
    }
})

const $ScrollEvent = Java.loadClass('net.minecraftforge.client.event.InputEvent$MouseScrollingEvent')

NativeEvents.onEvent($EventPriority.NORMAL, true, $ScrollEvent, event => {
    if (Client.screen) return;
    $VariableHandler.setVariable('hotbar', 'true');
})

const CuriosCapability = Java.loadClass('top.theillusivec4.curios.api.CuriosCapability');

function getCurioSlot(player, slotType) {
    let cap = player.getCapability(CuriosCapability.INVENTORY, null);
    if (!cap.isPresent()) return null;

    let curios = cap.resolve().get();
    let handlerOpt = curios.getStacksHandler(slotType);
    if (!handlerOpt.isPresent()) return null;

    return handlerOpt.get();
}