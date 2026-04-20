
ItemEvents.entityInteracted(event => {
    let { player, target } = event;
    if (target.type == 'darkages:blacksmith' && isInStructure(player, 'darkages:overworld/verden')) {
        if (!questCompleted(player, '162CB5FA587A5C38')) return;
        let offers = [
            {
                buy: Item.of('darkages:coin', 2).toNBT(),
                sell: Item.of('darkagesarmory:verden_helmet').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 3).toNBT(),
                sell: Item.of('magistuarmory:platemail_chestplate').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 3).toNBT(),
                sell: Item.of('magistuarmory:platemail_leggings').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 1).toNBT(),
                sell: Item.of('magistuarmory:platemail_boots').toNBT()
            }
        ]

         let merchantOffers = offers.map(def => MerchantJSUtils.createMerchantOffer(def))

        MerchantJSUtils.openMerchant(
            player,
            Component.translatable("Verden Blacksmith"),
            merchantOffers
        )
    }
})

MerchantEvents.afterTrade(event => {
    if (event.merchant.villagerData) return;
    let outputId = event.offer.output.id
    if (isInStructure(event.player, 'darkages:overworld/verden') && (outputId.includes('platemail') || outputId.includes('darkages')) && questAvailable(event.player, '0B0450DF1B6F9F7A')) {
     completeQuest(event.player, '0B0450DF1B6F9F7A') 
    }
})