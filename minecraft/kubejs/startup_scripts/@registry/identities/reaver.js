
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:reaver')
  .category('identity')
  .texture('darkages:textures/skills/path/reaver.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'reaver'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Reaver')
})