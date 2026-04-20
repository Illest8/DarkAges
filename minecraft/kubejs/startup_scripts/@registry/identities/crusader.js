
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:crusader')
  .category('identity')
  .texture('darkages:textures/skills/path/crusader.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'crusader'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Crusader')
})