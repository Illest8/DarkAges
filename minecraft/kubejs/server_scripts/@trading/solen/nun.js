
ItemEvents.entityInteracted(event => {
    let { player, target } = event;
    if (target.type == 'darkages:woman' && target.getDisplayName().toString().includes('Nun')) {
        let offers = [
            {
                buy: Item.of('darkages:coin', 1).toNBT(),
                sell: Item.of('legendarysurvivaloverhaul:healing_herbs', 3).toNBT(),
                xp: 0
            },
            {
                buy: Item.of('darkages:coin', 2).toNBT(),
                sell: Item.of('legendarysurvivaloverhaul:bandage', 2).toNBT()
            },
            {
                buy: Item.of('darkages:coin', 3).toNBT(),
                sell: Item.of('legendarysurvivaloverhaul:tonic').toNBT()
            }
        ]

         let merchantOffers = offers.map(def => MerchantJSUtils.createMerchantOffer(def))

        MerchantJSUtils.openMerchant(
            player,
            Component.translatable("Healing Items"),
            merchantOffers
        )
    }
})