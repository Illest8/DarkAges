// priority 997
MoreJSEvents.playerStartTrading((event) => {
    let merchant = event.merchant;

    if (merchant.offers) {
        merchant.offers.forEach(offer => {
            let og = offer.getFirstInput().count
            if (offer.getFirstInput().id == 'minecraft:emerald') {
                offer.setFirstInput(Item.of("darkages:coin", og/3))
            }
        })
    }
});