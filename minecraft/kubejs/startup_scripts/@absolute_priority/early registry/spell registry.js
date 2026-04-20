StartupEvents.postInit(event => {
    let $spellRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')

    global.spellRegistry = {}

    $spellRegistry.getEnabledSpells().forEach(spell => {
        const id = spell.getSpellId()
        const school = spell.getSchoolType().getDisplayName().string

        if (spell.getSchoolType().getDisplayName().string.includes('eldritch')) return
        if (id.includes('Wololo')) return

        if (!global.spellRegistry[school]) {
            global.spellRegistry[school] = []
        }

        global.spellRegistry[school].push({ id: id, school: school })
    })
})