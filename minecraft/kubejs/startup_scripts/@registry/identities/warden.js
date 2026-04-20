
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:warden')
  .category('identity')
  .texture('darkages:textures/skills/path/warden.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'warden'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Warden')
})