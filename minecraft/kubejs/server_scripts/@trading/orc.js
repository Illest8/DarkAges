
ItemEvents.entityInteracted(event => {
    let { player, target } = event;
    if (target.type == 'darkages:orc' && target.getDisplayName().toString().includes('Shaman') && player.hasEffect('darkages:disguise')) {
        let offers = [
            {
                buy: Item.of('darkages:coin', 2).toNBT(),
                sell: Item.of('darkages:orcish_helmet', 1).toNBT(),
                xp: 0
            },
            {
                buy: Item.of('darkages:coin', 3).toNBT(),
                sell: Item.of('darkages:orcish_chestplate', 1).toNBT()
            },
            {
                buy: Item.of('darkages:coin', 3).toNBT(),
                sell: Item.of('darkages:orcish_leggings').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 2).toNBT(),
                sell: Item.of('darkages:orcish_boots').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 3).toNBT(),
                sell: Item.of('darkages:orc_sword').toNBT()
            }
        ]

         let merchantOffers = offers.map(def => MerchantJSUtils.createMerchantOffer(def))

        MerchantJSUtils.openMerchant(
            player,
            Component.translatable("Orc Gear"),
            merchantOffers
        )
    }
})