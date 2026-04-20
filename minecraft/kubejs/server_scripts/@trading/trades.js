// priority 998

MoreJSEvents.villagerTrades(event => {
    event.addTrade('cleric', 5, TradeItem.of('darkages:coin', 3, 5), TradeItem.of('legendarysurvivaloverhaul:tonic', 2, 3));
    event.addTrade('cleric', 4, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('legendarysurvivaloverhaul:tonic', 1, 1));
    event.addTrade('cleric', 3, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('legendarysurvivaloverhaul:bandage', 1, 2));
    event.addTrade('cleric', 2, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('legendarysurvivaloverhaul:healing_herbs', 1, 2));

    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('iron_boots', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('iron_leggings', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('iron_chestplate', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('iron_helmet', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:gothic_boots', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:gothic_leggings', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:gothic_chestplate', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:sallet', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:crusader_boots', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:crusader_leggings', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:crusader_chestplate', 1, 1));
    event.addTrade('armorer', 2, TradeItem.of('darkages:coin', 3, 10), TradeItem.of('magistuarmory:greathelm', 1, 1));

    event.addTrade('weaponsmith', 1, TradeItem.of('darkages:coin', 5, 10), TradeItem.of('magistuarmory:iron_ahlspiess', 1, 1));
    event.addTrade('weaponsmith', 1, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('magistuarmory:wood_rondache', 1, 1));
    event.addTrade('weaponsmith', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('magistuarmory:wood_buckler', 1, 1));

    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 3, 3), TradeItem.of('travelersbackpack:standard', 1, 1, '{StorageSLots:27, Tier:0, ToolSlots:2}'));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('shears', 1, 1));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('bucket', 1, 1));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('stone_axe', 1, 1));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('overgeared:smithing_hammer', 1, 1));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('overgeared:iron_tongs', 1, 1));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('dragnlivestock:wagon_body', 1, 1));
    event.addTrade('toolsmith', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('dragnlivestock:wagon_wheel', 1, 2));

    event.addTrade('shepherd', 1, TradeItem.of('darkages:coin', 4, 6), TradeItem.of('travelersbackpack:brown_sleeping_bag', 1, 1));
    event.addTrade('shepherd', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('legendarysurvivaloverhaul:heating_coat_1', 1, 1));
    event.addTrade('shepherd', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('legendarysurvivaloverhaul:cooling_coat_1', 1, 1));

    event.addTrade('librarian', 1, TradeItem.of('darkages:coin', 4, 8), TradeItem.of('immersiveenchanting:ancient_book', 1, 1, '{StoredEnchantments:[{id:"minecraft:power",lvel:1s}]}'));
    event.addTrade('librarian', 1, TradeItem.of('darkages:coin', 4, 8), TradeItem.of('immersiveenchanting:ancient_book', 1, 1, '{StoredEnchantments:[{id:"minecraft:sharpness",lvel:1s}]}'));
    event.addTrade('librarian', 1, TradeItem.of('darkages:coin', 4, 8), TradeItem.of('immersiveenchanting:ancient_book', 1, 1, '{StoredEnchantments:[{id:"minecraft:protection",lvl:1s}]}')); 

    event.addTrade('cartographer', 1, TradeItem.of('darkages:coin', 2, 4), TradeItem.of('minecraft:apple', 4, 8));
    // event.addTrade('librarian', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('irons_spellbooks:copper_spell_book', 1, 1, '{ISB_Spells:{data:[],maxSpells:3,mustEquip:1b,spellWheel:1b}}'));
    // event.addTrade('librarian', 1, TradeItem.of('darkages:coin', 3, 5), TradeItem.of('irons_spellbooks:scroll', 1, 1));

    event.addTrade('leatherworker', 1, TradeItem.of('darkages:coin', 2, 5), TradeItem.of('minecraft:bundle', 1, 1));
    event.addTrade('leatherworker', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('leather', 3, 8));

    event.addTrade('fletcher', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('overgeared:iron_arrow', 18, 25));
    event.addTrade('fletcher', 1, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('darkages:short_bow', 1, 1));
    event.addTrade('fletcher', 1, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('bow', 1, 1));
    event.addTrade('fletcher', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('arrow', 24, 36));

    event.addTrade('fisherman', 1, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('tide:stone_fishing_rod', 1, 1, '{bait-contents:{item-0:{Count:10b,id:"tide:bait"},size:1}}'));
    event.addTrade('fisherman', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('tide:stone_fishing_rod', 1, 1));
    event.addTrade('fisherman', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('stardew_fishing:fish_display', 1, 1));
    event.addTrade('fisherman', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('tide:bait', 8, 16));
    event.addTrade('fisherman', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('supplementaries:rope', 5, 12));

    event.addTrade('farmer', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('supplementaries:rope', 5, 12));

    event.addTrade('darkages:lord', 1, TradeItem.of('darkages:coin', 2, 4), TradeItem.of('darkages:contract', 1, 1, '{contract:resident}'));
    event.addTrade('darkages:lord', 1, TradeItem.of('darkages:coin', 5, 8), TradeItem.of('darkages:contract', 1, 1, '{contract:"silver_mine"}'));
    event.addTrade('darkages:lord', 1, TradeItem.of('darkages:coin', 1, 1), TradeItem.of('darkages:contract', 1, 1, '{contract:"land"}'));

    event.addTrade('darkages:horse_trader', 1, TradeItem.of('darkages:coin', 1, 5), Item.of('supplementaries:cage', '{BlockEntityTag:{MobHolder:{EntityData:{AbsorptionAmount:0.0f,Age:0,Air:300s,ArmorDropChances:[0.085f,0.085f,0.0f,0.085f],ArmorItems:[{},{},{},{}],Attributes:[{Base:27.0d,Name:"minecraft:generic.max_health"},{Base:0.1d,Name:"caelus:fall_flying"},{Base:16.0d,Modifiers:[{Amount:0.01785709760101573d,Name:"Random spawn bonus",Operation:1,UUID:[I;-1886214042,-1469692443,-1676573211,-1737034462]}],Name:"minecraft:generic.follow_range"},{Base:0.17771661474480074d,Name:"minecraft:generic.movement_speed"},{Base:0.5587358439693156d,Name:"minecraft:horse.jump_strength"},{Base:0.0d,Name:"minecraft:generic.armor"},{Base:0.08d,Name:"forge:entity_gravity"},{Base:0.0d,Name:"minecraft:generic.luck"},{Base:0.0d,Name:"forge:step_height_addition"}],BalmData:{},Brain:{memories:{}},Bred:0b,Breed:1,CanDecompose:1b,CanPickUpLoot:0b,CanUpdate:1b,ChestedHorse:0b,CitadelData:{},DeathTime:0s,Decomp_Stage:0,EatingHaystack:0b,EntityJSData:{},Eyes:0,FallDistance:0.0f,FallFlying:0b,Feathering:2,Fire:0s,Flower_Type:0,ForcedAge:0,ForgeCaps:{"cloakanddagger:targeting":{},"cloakanddagger:vision":{detecting:{},lastUpdate:34135L,retina:15,vision:16.285713f},"curios:inventory":{Curios:[]},"iceandfire:entity_data":{chainedData:{},chickenData:{timeUntilNextEgg:-1},frozenData:{frozenTicks:0,isFrozen:0b},miscData:{hasDismounted:0b,loveTicks:0,lungeTicks:0},sirenData:{charmTime:0,charmedById:-1,isCharmed:0b}},"structure_gel:gel_entity":{portal:"structure_gel:empty"}},ForgeData:{insanelib:{tags:{spawn_type:13b}},"mobspropertiesrandomness:processed":1b,"mobspropertiesrandomness:scale_pehkui_applied":1b},Gender:1,HandDropChances:[0.085f,0.085f],HandItems:[{},{}],Health:27.0f,HealthTrained:0,HurtByTimestamp:0,HurtTime:0s,InLove:0,Invulnerable:0b,IsBranded:0b,IsHallow:0b,IsSnipped:0b,JumpTrained:0,LeftHanded:0b,Locked:0b,Mane:1,ManeGrowthTime:0,Motion:[0.0d,-0.0784000015258789d,0.0d],OnGround:1b,Overlay:0,Overlay_Texture:"dragnlivestock:textures/entity/horse/overlay/none.png",PersistenceRequired:0b,PortalCooldown:0,Pos:[0.5d,0.0626d,0.5d],Reindeer_Variant:7,Rotation:[0.0f,0.0f],SpeedTrained:0,SprintTime:300,Tail:3,TailGrowthTime:0,Tame:0b,Temper:0,TrainingTime:0,Undead:0b,Variant:29,Variant_Texture:"dragnlivestock:textures/entity/horse/blue_dun.png",castingEquipmentSlot:"",castingSpellId:"",castingSpellLevel:0,effectFlags:0L,evasionHitsRemaining:0.0f,"forge:spawn_type":"COMMAND",heartStopAccumulatedDamage:0.0f,id:"dragnlivestock:o_horse",isCasting:0b,spellSelection:{index:0,lastIndex:0,lastSlot:"",slot:""},usedSpecial:0b},Name:"Gray Horse",Scale:0.4375f,UUID:[I;73708340,-829996882,-2061137331,-383089766]}}}'));
    event.addTrade('darkages:horse_trader', 1, TradeItem.of("darkages:coin", 1, 3), Item.of('supplementaries:cage', '{BlockEntityTag:{MobHolder:{EntityData:{AbsorptionAmount:0.0f,Age:0,Air:300s,ArmorDropChances:[0.085f,0.085f,0.0f,0.085f],ArmorItems:[{},{},{},{}],Attributes:[{Base:20.0d,Name:"minecraft:generic.max_health"},{Base:0.08d,Name:"forge:entity_gravity"},{Base:0.0d,Name:"minecraft:generic.armor"},{Base:0.17000000178813934d,Name:"minecraft:generic.movement_speed"},{Base:0.1d,Name:"caelus:fall_flying"},{Base:16.0d,Modifiers:[{Amount:-0.014362355363176618d,Name:"Random spawn bonus",Operation:1,UUID:[I;1126871581,1878082299,-2092934086,-409068209]}],Name:"minecraft:generic.follow_range"},{Base:0.0d,Name:"minecraft:generic.luck"}],BalmData:{},Belled:0b,Brain:{memories:{}},BrandTagColor:0b,Bred:0b,Breed:8,CanPickUpLoot:0b,CanUpdate:1b,ChestedHorse:0b,CitadelData:{},DeathTime:0s,EatingHaystack:0b,EntityJSData:{},FallDistance:0.0f,FallFlying:0b,Fire:0s,ForcedAge:0,ForgeCaps:{"cloakanddagger:targeting":{},"cloakanddagger:vision":{detecting:{},lastUpdate:50029L,retina:15,vision:15.770203f},"curios:inventory":{Curios:[]},"iceandfire:entity_data":{chainedData:{},chickenData:{timeUntilNextEgg:-1},frozenData:{frozenTicks:0,isFrozen:0b},miscData:{hasDismounted:0b,loveTicks:0,lungeTicks:0},sirenData:{charmTime:0,charmedById:-1,isCharmed:0b}},"structure_gel:gel_entity":{portal:"structure_gel:empty"}},ForgeData:{insanelib:{tags:{spawn_type:13b}},"mobspropertiesrandomness:processed":1b,"mobspropertiesrandomness:scale_pehkui_applied":1b},Gender:1,HandDropChances:[0.085f,0.085f],HandItems:[{},{}],Harnessed:0b,Health:18.0f,HornType:0,HurtByTimestamp:0,HurtTime:0s,InLove:0,Invulnerable:0b,IsSnipped:0b,LeftHanded:0b,Locked:0b,Milked:0b,MilkedTime:162,Motion:[-0.03080342058564226d,-0.0784000015258789d,-0.0145245621255056d],OnGround:1b,Overlay:25,PersistenceRequired:0b,PortalCooldown:0,Pos:[0.5d,0.0626d,0.5d],Rotation:[0.0f,0.0f],Tagged:0b,Tame:0b,Temper:0,Variant:2,castingEquipmentSlot:"",castingSpellId:"",castingSpellLevel:0,effectFlags:0L,evasionHitsRemaining:0.0f,"forge:spawn_type":"COMMAND",heartStopAccumulatedDamage:0.0f,id:"dragnlivestock:o_cow",isCasting:0b,spellSelection:{index:0,lastIndex:0,lastSlot:"",slot:""},usedSpecial:0b},Name:"Cow",Scale:0.41666666f,UUID:[I;859426346,-1024835560,-1261763125,62172787]}}}'))

    event.addTrade('cleric', 1, TradeItem.of('darkages:coin', 2, 3), TradeItem.of('legendarysurvivaloverhaul:plaster', 2, 2));
    event.addTrade('cleric', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('legendarysurvivaloverhaul:plaster', 1, 1));

    event.addTrade('armorer', 1, TradeItem.of('darkages:coin', 1, 1), Item.of('magistuarmoryaddon:xiii_century_knight_chestplate', '{BlockEntityTag:{Base:13,Patterns:[{Color:15,Pattern:"tree"},{Color:7,Pattern:"bo"}],id:"minecraft:banner"},Damage:0}'));
    event.addTrade('armorer', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('overgeared:iron_plate', 4, 8));
    event.addTrade('armorer', 1, TradeItem.of('darkages:coin', 1, 4), TradeItem.of('chainmail_boots', 1, 1));
    event.addTrade('armorer', 1, TradeItem.of('darkages:coin', 1, 4), TradeItem.of('chainmail_leggings', 1, 1));
    event.addTrade('armorer', 1, TradeItem.of('darkages:coin', 1, 4), TradeItem.of('chainmail_chestplate', 1, 1));
    event.addTrade('armorer', 1, TradeItem.of('darkages:coin', 1, 4), TradeItem.of('chainmail_helmet', 1, 1));
})

MoreJSEvents.wandererTrades((event) => {
    event.removeModdedTrades(1);
    event.removeModdedTrades(2);
    event.removeVanillaTrades(1);
    event.removeVanillaTrades(2);
});

MoreJSEvents.wandererTrades((event) => {
    event.addTrade(1, TradeItem.of('darkages:coin', 2, 4), Item.of('darkages:revenant_vial'));
    event.addTrade(1, TradeItem.of('darkages:coin', 1, 1), 'farmersdelight:shepherds_pie');
    event.addTrade(1, TradeItem.of('darkages:coin', 2, 2), 'legendarysurvivaloverhaul:tonic');
    event.addTrade(2, TradeItem.of('darkages:coin', 7, 12), Item.of('irons_spellbooks:gold_spell_book', '{ISB_Spells:{data:[],maxSpells:8,mustEquip:1b,spellWheel:1b}}')).maxUses(1);
    event.addTrade(2, TradeItem.of('darkages:coin', 1, 1), 'legendarysurvivaloverhaul:tonic').maxUses(2);
})

let clearProfessions = ['minecraft:toolsmith', 'minecraft:librarian', 'minecraft:fisherman', 'minecraft:weaponsmith', 'minecraft:mason', 'minecraft:armorer', 'mca:adventurer', 'mca:cultist', 'minecraft:farmer', 'iceandfire:scribe', 'minecraft:shepherd']

MoreJSEvents.villagerTrades((event) => {
    event.removeVanillaTrades();
    for (let i = 1; i < 6; i++) {
        event.removeModdedTrades(clearProfessions, i);
    }
});

// MODDED TRADES   
MoreJSEvents.villagerTrades((event) => {
    event.addTrade('mca:adventurer', 1, 'darkages:coin', TradeItem.of('2x iceandfire:troll_tusk'));
    event.addTrade('mca:adventurer', 1, 'darkages:coin', '5x iceandfire:ambrosia');
    event.addTrade('mca:adventurer', 2, '5x darkages:coin', TradeItem.of("iceandfire:hippocampus_fin"));
    event.addTrade('mca:adventurer', 2, '5x darkages:coin', TradeItem.of('iceandfire:deathworm_tounge'));
    event.addTrade('mca:adventurer', 2, 'darkages:coin', TradeItem.of('iceandfire:hydra_fang', 4, 8));
    event.addTrade('mca:adventurer', 2, '2x darkages:coin', TradeItem.of('iceandfire:dragonbone', 1, 2));
    event.addTrade('mca:adventurer', 2, TradeItem.of('darkages:coin', 3, 5), TradeItem.of('iceandfire:pixie_wand'));
    event.addTrade('mca:adventurer', 1, 'darkages:coin', TradeItem.of('iceandfire:pixie_dust', 2, 5));
    event.addTrade('mca:adventurer', 1, '3x darkages:coin', TradeItem.of('iceandfire:amphithere_feather', 2, 2));
    event.addTrade('mca:cultist', 1, 'darkages:coin', 'shield');
    event.addTrade('mca:cultist', 2, 'darkages:coin', 'shield');
})

// SCRIBE
MoreJSEvents.villagerTrades(event => {
    event.addTrade('iceandfire:scribe', 1, TradeItem.of('darkages:coin', 2, 5), 'irons_spellbooks:scroll');
    event.addTrade('iceandfire:scribe', 2, TradeItem.of('darkages:coin', 4, 8), 'irons_spellbooks:scroll');
    event.addTrade('iceandfire:scribe', 3, TradeItem.of('darkages:coin', 10, 14), 'irons_spellbooks:scroll');
    event.addTrade('iceandfire:scribe', 4, TradeItem.of('darkages:coin', 12, 16), 'irons_spellbooks:scroll');
    event.addTrade('iceandfire:scribe', 5, TradeItem.of('darkages:coin', 16, 20), 'irons_spellbooks:scroll');
    event.addTrade('iceandfire:scribe', 1, 'darkages:coin', 'irons_spellbooks:inscription_table');
    event.addTrade('iceandfire:scribe', 1, 'darkages:coin', TradeItem.of('iceandfire:manuscript', 3, 5));
    event.addTrade('iceandfire:scribe', 1, 'darkages:coin', TradeItem.of('minecraft:paper', 4, 10));
    event.addTrade('iceandfire:scribe', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('irons_spellbooks:copper_spell_book', 1, 1, '{ISB_Spells:{data:[],maxSpells:3,mustEquip:1b,spellWheel:1b}}'));
    event.addTrade('iceandfire:scribe', 2, TradeItem.of('darkages:coin', 3, 7), TradeItem.of('irons_spellbooks:iron_spell_book', 1, 1, '{ISB_Spells:{data:[],maxSpells:5,mustEquip:1b,spellWheel:1b}}'));
    event.addTrade('iceandfire:scribe', 5, TradeItem.of('darkages:coin', 16, 24), 'irons_spellbooks:ancient_knowledge_fragment');
})

//INN KEEPER
MoreJSEvents.villagerTrades(event => {
    event.addTrade('darkages:inn_keeper', 1, '10x darkages:coin', Item.of('darkages:contract', 1, '{contract:inns}')).villagerExperience(-5);
    event.addTrade('darkages:inn_keeper', 1, '3x darkages:coin', Item.of('supplementaries:key', "{display:{Name:'{\"text\":\"Alchemy Stall\"}'}}")).villagerExperience(-5);
    event.addTrade('darkages:inn_keeper', 1, '3x darkages:coin', Item.of('supplementaries:key', "{display:{Name:'{\"text\":\"Reforging Stall\"}'}}")).villagerExperience(-5);
    event.addTrade('darkages:inn_keeper', 1, '3x darkages:coin', Item.of('supplementaries:key', "{display:{Name:'{\"text\":\"Scroll Forge Stall\"}'}}")).villagerExperience(-5);
})

// BUTCHER
MoreJSEvents.villagerTrades((event) => {
    event.addTrade('butcher', 1, 'darkages:coin', TradeItem.of('farmersdelight:beef_patty', 4, 12));
    event.addTrade('butcher', 1, 'darkages:coin', TradeItem.of('farmersdelight:cooked_mutton_chops', 6, 14));
    event.addTrade('butcher', 1, 'darkages:coin', TradeItem.of('farmersdelight:cooked_chicken_cuts', 6, 16));
    event.addTrade('butcher', 1, 'darkages:coin', TradeItem.of('cooked_beef', 4, 7));
    event.addTrade('butcher', 1, 'darkages:coin', TradeItem.of('farmersdelight:cooked_bacon', 6, 12));
    event.addTrade('butcher', 1, 'darkages:coin', TradeItem.of('farmersdelight:smoked_ham', 4, 10));
    event.addTrade('butcher', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('farmersdelight:barbecue_stick', 3, 8));
    event.addTrade('butcher', 1, TradeItem.of('darkages:coin', 1, 2), TradeItem.of('farmersdelight:beef_stew', 2, 4));
    event.addTrade('butcher', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('farmersdelight:roasted_mutton_chops', 2, 4));
    event.addTrade('butcher', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('farmersdelight:roast_chicken', 2, 4));
    event.addTrade('butcher', 1, TradeItem.of('darkages:coin', 1, 3), TradeItem.of('farmersdelight:honey_glazed_ham', 2, 4));
})

// MASON
MoreJSEvents.villagerTrades((event) => {
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('minecraft:stone', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:calcite_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:jasper_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:andesite_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:diorite_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:shale_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:limestone_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:cobblestone_bricks', 20, 32));
    event.addTrade('mason', 1, 'darkages:coin', TradeItem.of('quark:tuff_bricks', 20, 32));
})

MoreJSEvents.villagerTrades((event) => {
})











































