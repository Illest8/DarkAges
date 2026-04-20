
ItemEvents.entityInteracted(event => {
    let { player, target } = event;
    if (target.type == 'darkages:merchant' && target.getDisplayName().toString().includes('Yardsman')) {
        let offers = [
            {
                buy: Item.of('darkages:coin', 8).toNBT(),
                sell: Item.of('smallships:dark_oak_cog').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 14).toNBT(),
                sell: Item.of( 'smallships:dark_oak_drakkar').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 20).toNBT(),
                sell: Item.of('smallships:dark_oak_galley').toNBT()
            },
            {
                buy: Item.of('darkages:coin', 25).toNBT(),
                sell: Item.of('smallships:dark_oak_brigg').toNBT()
            }
        ]

         let merchantOffers = offers.map(def => MerchantJSUtils.createMerchantOffer(def))

        MerchantJSUtils.openMerchant(
            player,
            Component.translatable("Boat Yard"),
            merchantOffers
        )
    }
})