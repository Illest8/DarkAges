
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:acolyte')
  .category('identity')
  .texture('darkages:textures/skills/path/acolyte.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'acolyte'
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Acolyte')
})