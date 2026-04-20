
ItemEvents.entityInteracted(event => {
    let { player, target } = event;
    if (target.type == 'darkages:merchant' && target.getDisplayName().toString().includes('Lumberjack')) {
        let offers = [
            {
                buy: Item.of('darkages:coin', getSkillCategoryLevel(player, 'darkages:darkages')).toNBT(),
                sell: Item.of('oak_log', (20 * getSkillCategoryLevel(player, 'darkages:darkages'))).toNBT(),
                xp: 0
            }
        ]

         let merchantOffers = offers.map(def => MerchantJSUtils.createMerchantOffer(def))

        MerchantJSUtils.openMerchant(
            player,
            Component.translatable("Lumberjack"),
            merchantOffers
        )
    }
})

MerchantEvents.afterTrade(event => {
    if (event.merchant.villagerData) return;
    if (isInStructure(event.player, 'darkages:overworld/verden') && event.offer.output.id.toString().includes('oak_log') && !questCompleted(event.player, '0621EBA83466A6C4')) {
     event.player.server.runCommandSilent(`dialog ${event.player.username} show ${event.player.username} verden_lumberjack`)
    }
})