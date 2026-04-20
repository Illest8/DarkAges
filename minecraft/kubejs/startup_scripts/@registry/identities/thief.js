
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:thief')
  .category('identity')
  .texture('darkages:textures/skills/path/rogue.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'thief'
    skill.executor.original.server.runCommandSilent(`execute as ${skill.executor.original.username} run skills remove`)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Thief')
})