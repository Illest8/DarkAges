playsound darkages:ligpin_roar master @a[distance=..30]
data merge entity @s {ArmorItems:[{id: "minecraft:golden_boots", Count: 1b}, {id: "minecraft:golden_leggings", Count: 1b}, {id: "minecraft:golden_chestplate", Count: 1b}, {id: "minecraft:golden_helmet", Count: 1b}]}
attribute @s generic.movement_speed base set 0.4
execute as @a[distance=..30] run title @s actionbar {"text": "\uE904: "}
attribute @s epicfight:stamina_regen base set 2.5