
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:archmage')
  .category('identity')
  .texture('darkages:textures/skills/advanced_magic.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'mage'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Archmage')
})