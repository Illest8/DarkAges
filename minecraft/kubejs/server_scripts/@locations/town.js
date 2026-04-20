BlockEvents.rightClicked('darkages:statue', event => {
    let player = event.player

    if (isInLawStructure(player)) {

        let offers = [
            {
                buy: Item.of('darkages:coin').toNBT(),
                sell: Item.of('minecraft:stone').toNBT(),
                uses: 0,
                maxUses: 1,
                xp: 5
            },
            {
                buy: Item.of("minecraft:beef").toNBT(),
                sell: Item.of("darkages:coin").toNBT()
            },
            {
                buy: Item.of("minecraft:beef").toNBT(),
                sell: Item.of("minecraft:egg").toNBT()
            }
        ]

        let solen = [
            {
                buy: Item.of('darkages:coin').toNBT(),
                sell: Item.of('legendarysurvivaloverhaul:bandage').toNBT()
            }
        ]

        let merchantOffers = offers.map(def => MerchantJSUtils.createMerchantOffer(def))

        MerchantJSUtils.openMerchant(
            player,
            Component.translatable("Global Shop"),
            merchantOffers
        )
    }
})

// MerchantEvents.afterTrade(event => {
//     let { player, merchant } = event;
//     let merchantType = merchant.villagerData?.profession
//     if (merchantType == 'farmer' && !questCompleted(player, '762A9E6FEC9A67DD')) {
//         completeQuest(player, '762A9E6FEC9A67DD')
//         player.tell(Text.of(`You've unlocked a new quest!`).gold().italic())
//     }
// })