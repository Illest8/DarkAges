
const $KeyMapEvent = Java.loadClass('net.minecraftforge.client.event.RegisterKeyMappingsEvent');
NativeEvents.onEvent($EventPriority.NORMAL, false, $KeyMapEvent, event => {
  let $KeyMappingRegistry = Java.loadClass('dev.architectury.registry.client.keymappings.KeyMappingRegistry');
  let $KeyMapping = Java.loadClass('net.minecraft.client.KeyMapping');
  let $GLFW = Java.loadClass('org.lwjgl.glfw.GLFW');

  $KeyMappingRegistry.register(new $KeyMapping('key.darkages.quick_open_journal', $GLFW.GLFW_KEY_V, 'key.categories.misc'))
})