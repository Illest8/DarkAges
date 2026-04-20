// priority 998
MoreJSEvents.playerStartTrading((event) => {
    let merchant = event.merchant;
    let merchantType = merchant.villagerData?.profession
    let player = event.player
    let stages = event.player.stages
    if (!merchant.villagerData || merchantType == 'none') {
        return;
    }

    if (merchantType != 'darkages:inn_keeper') return;

    // Default Trades
    if (stages.has('archevoker')) {
        merchant.offers.clear()
        merchant.offers.add(VillagerUtils.createSimpleTrade(Item.of('book', "{Damage:0,RepairCost:0,display:{Name:'{\"text\":\"Withered Journal\"}'}}").enchant('minecraft:binding_curse', 1), 'irons_spellbooks:wayward_compass').getOffer(player, event.level.random))
    }
    else {
        merchant.offers.clear()
        merchant.offers.add(VillagerUtils.createSimpleTrade('10x darkages:coin', Item.of('darkages:contract', 1, '{contract:inns}')).getOffer(player, event.level.random))
    }
});