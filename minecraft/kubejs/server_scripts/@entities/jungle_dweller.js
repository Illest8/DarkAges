EntityJSEvents.addGoalSelectors('darkages:jungle_dweller', event => {
    const WizardAttackGoal = Java.loadClass('io.redspace.ironsspellbooks.entity.mobs.goals.WizardAttackGoal')

    event.arbitraryGoal(0, (e) => {

        return new WizardAttackGoal(e, 0.8, 60)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:blood_slash'),
                    Spell.of('irons_spellbooks:devour')
                ],
                [Spell.of('irons_spellbooks:raise_dead')],
                [Spell.of('irons_spellbooks:heartstop')],
                []
            )
            .setSpellQuality(0.1, 0.1)
    })
})