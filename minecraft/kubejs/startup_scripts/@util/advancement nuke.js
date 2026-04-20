ForgeEvents.onEvent('net.minecraftforge.event.entity.player.AdvancementEvent', event => {
  // event.getEntity().tell(event.advancement.display.title.string)
  event.setResult('deny')
})