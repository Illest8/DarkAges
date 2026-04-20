EntityJSEvents.addGoalSelectors('darkages:monk', event => {
    const WizardAttackGoal = Java.loadClass('io.redspace.ironsspellbooks.entity.mobs.goals.WizardAttackGoal')

    event.arbitraryGoal(0, (e) => {

        return new WizardAttackGoal(e, 1.3, 200, 60)
            .setSpells(
                [Spell.of('irons_spellbooks:fireball')],
                [Spell.of('irons_spellbooks:starfall')],
                [Spell.of('irons_spellbooks:evasion')],
                []
            )
            .setSpellQuality(1.0, 1.0)
    })
})