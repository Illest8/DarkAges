StartupEvents.modifyCreativeTab('minecraft:combat', event => {
    event.setIcon('epicfight:iron_greatsword')
    event.remove('#minecraft:arrows')
    event.remove('#minecraft:swords')
    event.remove('@overgeared')
    event.remove('@smallships')
    event.remove('firework_rocket')
    event.remove('#forge:armors')
    event.remove('#minecraft:axes')
    event.remove('@supplementaries')
    event.remove([
        'minecraft:trident',
        'minecraft:shield',
        'minecraft:leather_horse_armor',
        'minecraft:iron_horse_armor',
        'minecraft:golden_horse_armor',
        'minecraft:diamond_horse_armor',
        'minecraft:totem_of_undying',
        'minecraft:tnt',
        'minecraft:end_crystal',
        'minecraft:snowball',
        'minecraft:egg',
        'minecraft:bow',
        'minecraft:crossbow'
    ])
    for (let type in global.weaponRegistry) {
        global.weaponRegistry[type].forEach(entry => {
            event.add(entry.id)
        })
    }
    event.addBefore('minecraft:wooden_sword', [
        Item.of('irons_spellbooks:netherite_spell_book', '{ISB_Spells:{data:[],maxSpells:12,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:diamond_spell_book', '{ISB_Spells:{data:[],maxSpells:10,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:gold_spell_book', '{ISB_Spells:{data:[],maxSpells:8,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:iron_spell_book', '{ISB_Spells:{data:[],maxSpells:6,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:copper_spell_book', '{ISB_Spells:{data:[],maxSpells:5,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:cursed_doll_spell_book', '{"irons_spellbooks:affinity_data":{bonuses:{"irons_spellbooks:blood_slash":1,"irons_spellbooks:blood_step":1}},"irons_spellbooks:spell_container":{data:[],maxSpells:10,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:ice_spell_book', '{"irons_spellbooks:spell_container":{data:[],maxSpells:12,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:evoker_spell_book', '{ISB_Spells:{data:[{id:"irons_spellbooks:fang_strike",index:0,level:6,locked:1b},{id:"irons_spellbooks:fang_ward",index:1,level:4,locked:1b},{id:"irons_spellbooks:summon_vex",index:2,level:4,locked:1b}],maxSpells:10,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:necronomicon_spell_book', '{ISBEnhance:"irons_spellbooks:raise_dead",ISB_Spells:{data:[{id:"irons_spellbooks:blood_slash",index:0,level:5,locked:1b},{id:"irons_spellbooks:blood_step",index:1,level:5,locked:1b},{id:"irons_spellbooks:ray_of_siphoning",index:2,level:5,locked:1b},{id:"irons_spellbooks:blaze_storm",index:3,level:5,locked:1b}],maxSpells:10,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:rotten_spell_book', '{ISB_Spells:{data:[],maxSpells:8,mustEquip:1b,spellWheel:1b}}'),
        Item.of('irons_spellbooks:blaze_spell_book', '{ISB_Spells:{data:[],maxSpells:10,mustEquip:1b,spellWheel:1b}}'),
        'minecraft:bow',
        'darkages:short_bow',
        'darkages:hunting_bow',
        'darkages:copper_longbow',
        'darkages:iron_longbow',
        'darkages:diamond_longbow',
        'darkages:netherite_longbow',
        'iceandfire:dragonbone_bow',
        'darkages:crossbow',
        'minecraft:crossbow',
        'minecraft:arrow',
        'overgeared:iron_arrow',
        'overgeared:steel_arrow',
        'overgeared:diamond_arrow',
        'apotheosis:broadhead_arrow',
        'apotheosis:explosive_arrow',
        'apotheosis:obsidian_arrow',
        'iceandfire:hydra_arrow',
        'iceandfire:sea_serpent_arrow',
        'iceandfire:stymphalian_arrow',
        'iceandfire:amphithere_arrow',
        'iceandfire:dragonbone_arrow',
        'supplementaries:rope_arrow',
        'supplementaries:bomb',
        'supplementaries:bomb_blue',
        'supplementaries:cannonball'
    ])
    const shieldItems = Ingredient.of(/buckler|ellipticalshield|heatershield|kiteshield|rondache|roundshield|_target/).itemIds;
    shieldItems.forEach(shieldItem => {
        if (shieldItem.includes('bronze') || shieldItem.includes('tin')) return;
        event.add(shieldItem)
    })
})


    // const skillbooks = makeSkillbooks()
    // skillbooks.forEach(skillbook => {
    //     event.add(skillbook);
    // })
// function makeSkillbooks() {
//     return [
//         Item.of('epicfight:skillbook', '{skill:"wom:adrenaline"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:aqua_maneuvre"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:arrow_tenacity"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:back_and_forth"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:berserker"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:bloodwolf"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:bstep"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:bull_charge"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:counter_attack"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:critical_knowledge"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:dancing_blade"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:death_harvest"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:demolition_leap"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:dodge_master"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:emergency_escape"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:ender_obscuris"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:ender_step"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:endurance"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:ex_yamato_step"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:fatalfalsh"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:forbidden_strength"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:guard"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:heart_shield"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:hypervitality"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:impact_guard"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:latent_retribution"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:meditation"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:meteor_slam"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:mindset"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:pain_anticipation"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:parrying"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:perfect_bulwark"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:phantom_ascent"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:precise_roll"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:punishment_kick"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:revelation"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:roll"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:shadow_step"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:shulker_cloak"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:soul_protection"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:spider_techniques"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:sstep"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:stamina_pillager"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:step"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:swordmaster"}'),
//         Item.of('epicfight:skillbook', '{skill:"epicfight:technician"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:time_travel"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:vampirize"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:vengeful_parry"}'),
//         Item.of('epicfight:skillbook', '{skill:"wom:voodoo_magic"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:wolf_dodge"}'),
//         Item.of('epicfight:skillbook', '{skill:"cdmoveset:yamato_step"}')
//     ];
// }