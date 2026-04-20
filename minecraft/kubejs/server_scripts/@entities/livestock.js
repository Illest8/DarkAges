let livestock = [
    'dragnlivestock:o_cow',
    'dragnlivestock:o_sheep',
    'dragnlivestock:o_pig',
    'dragnlivestock:o_goat',
    'dragnlivestock:o_chicken',
    'dragnlivestock:o_horse',
    'dragnlivestock:o_donkey',
    'dragnlivestock:o_mule'
]


livestock.forEach(animal => {
    EntityEvents.spawned(animal, event => {
        if (isInLawStructure(event.entity) && !event.entity.persistentData.isOwner) {
            event.entity.persistentData.isOwner = 'a villager.'
        }
    })
})