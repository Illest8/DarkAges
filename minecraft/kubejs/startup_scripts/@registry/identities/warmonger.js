
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:warmonger')
  .category('identity')
  .texture('darkages:textures/skills/path/warmonger.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'warmonger'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Warmonger')
})