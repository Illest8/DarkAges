
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:black_priar')
  .category('identity')
  .texture('darkages:textures/skills/path/black_priar.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'black_priar'
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Black Priar')
})