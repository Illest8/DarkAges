ClientEvents.lang("en_us", event => {
  let minecraftEnchantments = {
    protection: "Reduces damage taken from (almost) all sources",
    fire_protection: "Reduces damage taken from fire",
    feather_falling: "Reduces damage taken from falling",
    blast_protection: "Reduces damage taken from explosions",
    projectile_protection: "Reduces damage taken from projectiles",
    respiration: "Increases the amount of time you can spend underwater",
    aqua_affinity: "Removes the underwater mining speed penalty",
    thorns: "Has a chance to reflect damage taken back to the attacker",
    sharpness: "Increases damage done to all targets",
    smite: "Increases damage done to undead mobs",
    bane_of_arthropods: "Increases damage done to arthropods",
    knockback: "Increases knockback dealt",
    fire_aspect: "Lights targets on fire",
    looting: "Increases the chance of getting rare items from mob drops",
    efficiency: "Increases mining speed on effective blocks",
    silk_touch: "Allows harvesting fragile blocks like glass",
    unbreaking: "Reduces durability damage done to the tool",
    fortune: "Increases drops from blocks",
    power: "Increases damage done by arrows fired from this bow",
    punch: "Increases knockback done by arrows fired from this bow",
    flame: "Lights arrows fired from this bow on fire",
    infinity: "Makes this bow not consume arrows",
    luck_of_the_sea: "Increases the chance of getting rare items from fishing",
    lure: "Decreases times between fish bites",
    depth_strider: "Increases movement speed in water",
    frost_walker: "Temporarily freezes water in an area around your feet",
    mending: "Consumes experience orbs picked up to repair this item",
    binding_curse: "Curses your armour so that you cannot remove it once equipped",
    vanishing_curse: "Item disappears on death",
    sweeping: "Makes sweep attacks deal more damage",
    loyalty: "Returns the trident to you when it hits",
    impaling: "Increases damage done to players and water based mobs",
    riptide: "When wet, will launch the player with this trident when thrown",
    channeling: "Channels lightning during thunderstorms",
    multishot: "Shoots three arrows at once",
    quick_charge: "Decreases the charging time of this crossbow",
    piercing: "Projectiles launched from this crossbow will pierce multiple mobs",
    soul_speed: "Increases speed on soul sand and soil, at the cost of durability",
    swift_sneak: "Increase speed when sneaking"
  }
  for (let i in minecraftEnchantments) {
    event.add("enchantment.minecraft." + i + ".desc", minecraftEnchantments[i])
  }

  let womEnchantments = {
    invigoration: "Increases combat stamina"
  }
  for (let i in womEnchantments) {
    event.add("enchantment.wom." + i + ".desc", womEnchantments[i])
  }
})