
StartupEvents.registry('custom_stat', event => {
  global.WORTH = event.create('darkages:worth', 'basic').id
})

StartupEvents.registry('custom_stat', event => {
  global.BOUNTIES = event.create('darkages:bounties_completed', 'basic').id
})

StartupEvents.registry('custom_stat', event => {
  global.ASSASSINATIONS = event.create('darkages:assassinations', 'basic').id
})