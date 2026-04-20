
StartupEvents.registry('epicfight:skill', event => {
  event.create('darkages:hunter')
  .category('identity')
  .texture('darkages:textures/skills/path/hunter.png')
  .onInitiate(skill => {
    skill.executor.original.persistentData.identity = 'hunter'
    skill.setReplaceCooldown(1728000)
  })
  .onRemoved(skill => {
    delete skill.executor.original.persistentData.identity
  })
  .displayName('Hunter')
})