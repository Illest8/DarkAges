
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:highlander')
  .category('identity')
  .texture('darkages:textures/skills/path/highlander.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'highlander'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Highlander')
})