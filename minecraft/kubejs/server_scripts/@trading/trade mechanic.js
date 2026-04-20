// priority 997

MoreJSEvents.playerStartTrading(event => {
    const player = event.player;
    const merchant = event.merchant;
    const era = event.player.server.persistentData.era

    if (!merchant.villagerData) return;

    let merchantType = merchant.villagerData?.profession;
    let tradeLevel = determineTradeLevel(merchant, merchantType);

    if (player.getMainHandItem() == 'apotheosis:sigil_of_rebirth') {
        merchant.offers.clear();
        player.getMainHandItem().count--;
    }

    if (merchantType === 'none' || merchantType === 'darkages:inn_keeper') return;

    cleanupBadScrollOffers(merchant, tradeLevel, player);

    setOfferCount(merchant, tradeLevel, player, era);
});

function determineTradeLevel(merchant, merchantType) {
    let level = merchant.villagerData.level;

    const forcedLevel1 = [
        'darkages:horse_trader', 'darkages:lord', 'mca:adventurer', 'cartographer',
        'farmer', 'butcher', 'mason', 'shepherd',
        'fisherman', 'leatherworker'
    ];

    let typeId = merchantType.toString();

    if (forcedLevel1.includes(typeId)) return 1;

    if (Math.random() > 0.3) {
        return Math.ceil(Math.random() * level);
    }

    return level;
}

function cleanupBadScrollOffers(merchant, tradeLevel, player) {
    let badOffers = merchant.getOffers().filter(offer =>
        offer.getOutput().id === 'irons_spellbooks:scroll' &&
        !offer.getOutput().nbt
    );

    if (badOffers.length > 0) {
        merchant.offers.clear();
        addScrollOffer(merchant, tradeLevel, player);
    }
}

function setOfferCount(merchant, tradeLevel, player, era) {
    let offers = merchant.getOffers();

    let tradeCount = (era === 'silk_road') ? 5 : 3;

    while (offers.size() > tradeCount) {
        offers.remove(offers.size() - 1);
    }

    if (offers.size() > 0 && offers.get(0).maxUses > 1) {
        merchant.offers.clear();
        offers = merchant.getOffers();
    }

    for (let i = offers.size() - 1; i >= 0; i--) {
        let offer = offers.get(i);
        if (offer.uses > 0) {
            offers.remove(i);
            let newOffer = generateNewOffer(merchant, tradeLevel, player);
            if (newOffer) offers.add(newOffer);
        }
    }

    while (offers.size() < tradeCount) {
        let newOffer = generateNewOffer(merchant, tradeLevel, player);
        if (newOffer) offers.add(newOffer);
    }
}

function generateNewOffer(merchant, tradeLevel, player) {
    const merchantType = merchant.villagerData.profession;
    const typeID = merchantType.toString()
    const trade = VillagerUtils.getRandomVillagerTrade(merchantType, tradeLevel);
    const offer = trade.getOffer(player, player.level.random);

    if (offer.getOutput() == 'irons_spellbooks:scroll') {
        addScrollOffer(merchant, tradeLevel, player);
        return null;
    }

    if (offer.getOutput() == 'darkages:contract' && offer.getOutput().nbt.contract == 'resident') {
        return checkHouseOffer(player, merchant, tradeLevel, offer);
    }

    if (['weaponsmith', 'armorer', 'fletcher', 'toolsmith'].includes(typeID)) {
        applyAffixLogic(offer, player);
    }

    offer.firstInput.setCount(offer.firstInput.count + getFactionRank(player.server, player.persistentData.faction))
    offer.maxUses = 1;
    offer.setRewardExp(false);
    return offer;
}

const rarityTables = [
    { minLevel: 0,  weights: { 1: 70, 2: 25, 3: 5 } },
    { minLevel: 11, weights: { 1: 60, 2: 25, 3: 10, 4: 5 } },
    { minLevel: 21, weights: { 1: 50, 2: 30, 3: 15, 4: 5 } },
    { minLevel: 31, weights: { 1: 40, 2: 30, 3: 20, 4: 8, 5: 2 } },
    { minLevel: 41, weights: { 1: 30, 2: 25, 3: 20, 4: 15, 5: 10 } }
];

function normalizeWeights(weights) {
    let normalized = Object.create(null);

    for (let key in weights) {
        let cleanKey = Number(String(key));
        let cleanValue = Number(String(weights[key]).replace(/[^\d.-]/g, ""));
        if (!isNaN(cleanKey) && !isNaN(cleanValue) && cleanValue > 0) {
            normalized[cleanKey] = cleanValue;
        }
    }

    return normalized;
}

function weightedTradeRandom(weights, random) {
    let entries = [];

    for (let key in weights) {
        let k = Number(String(key));
        let v = Number(weights[key]);
        if (!isNaN(k) && !isNaN(v) && v > 0) {
            entries.push([k, v]);
        }
    }

    let total = entries.reduce((sum, [, w]) => sum + w, 0);

    if (total <= 0 || entries.length === 0) {
        return 1;
    }

    let roll = random.nextFloat() * total;
    let cumulative = 0;

    for (let [key, weight] of entries) {
        cumulative += weight;
        if (roll < cumulative) {
            return key;
        }
    }

    return entries[0][0];
}

function getRarityIndexForLevel(level, random) {
    for (let i = rarityTables.length - 1; i >= 0; i--) {
        let table = rarityTables[i];
        if (level >= table.minLevel) {
            let normalized = normalizeWeights(table.weights);
            let roll = weightedTradeRandom(normalized, random);
            if (roll == null || isNaN(roll)) roll = 1;
            return roll;
        }
    }
    return 1;
}

function applyAffixLogic(offer, player) {
    let output = offer.getOutput();
    if ($LootCategory.forItem(output.item) == $LootCategory.NONE) return;

    let skillLevel = getSkillCategoryLevel(player, 'darkages:darkages');
    let rarityList = $RarityRegistry.INSTANCE.getOrderedRarities();

    let baseRoll = getRarityIndexForLevel(skillLevel, player.level.random);

    let rarityIndex = Number(baseRoll) - 1;
    rarityIndex = Math.max(0, Math.min(rarityIndex, rarityList.size() - 1));
    if (isNaN(rarityIndex)) rarityIndex = 0;

    let rarity = rarityList.get(rarityIndex).value();
    let newStack = $LootController.createLootItem(output.item, rarity, player.level.random);

    newStack.setNbt(newStack.nbt.merge({
        rarity: rarity.toString().match(/LootRarity\{(?:.+):(.+)\}/)[1],
        ForgingQuality: getMerchantForgingQuality(player.level.random)
    }));

    offer.setOutput(newStack);

    offer.getFirstInput().count +=
        Math.floor(skillLevel / 10) +
        player.level.random.nextInt(Math.max(1, rarityIndex));
}

function checkHouseOffer(player, merchant, tradeLevel, offer) {
    const town = getTown(player);
    if (!town) {
        return generateNewOffer(merchant, tradeLevel, player);
    }

    const unowned = getPurchasableHouse(player);
    if (unowned.length === 0) {
        return generateNewOffer(merchant, tradeLevel, player);
    }

    const house = unowned[0];
    if (!house) {
        return generateNewOffer(merchant, tradeLevel, player);
    }

    let offers = merchant.getOffers();
    for (let i = 0; i < offers.size(); i++) {
        let existing = offers.get(i).getOutput();
        if (!existing || existing.id !== 'darkages:contract') continue;

        let c = existing.nbt?.Contract;
        if (!c) continue;

        if (c.houseID === house.id) {
            return generateNewOffer(merchant, tradeLevel, player);
        }
    }
    offer.setOutput(
        Item.of(
            'darkages:contract',
            `{Contract:{houseID:${house.id},Type:"${house.type}",Town:"${getTownName(player)}",x:${house.center.getX()},y:${house.center.getY()},z:${house.center.getZ()}}}`
        )
    );

    offer.setMaxUses(1);

    return offer;
}

function addScrollOffer(merchant, tradeLevel, player) {
    if (!global.spellList || global.spellList.length === 0) {
        player.tell('Error: spell list not loaded');
        return;
    }

    let skillLevel = getSkillCategoryLevel(player, 'darkages:darkages');
    let benchmark =
        skillLevel <= 10 ? 1 :
            skillLevel <= 20 ? 2 :
                skillLevel <= 30 ? 3 :
                    skillLevel <= 40 ? 4 : 5;

    const merchantType = merchant.villagerData.profession;
    const trade = VillagerUtils.getRandomVillagerTrade(merchantType, tradeLevel);
    const offer = trade.getOffer(player, player.level.random);

    // const spell = global.spellList[Math.floor(Math.random() * global.spellList.length)];

    offer.setOutput(Item.of('irons_spellbooks:scroll',
        `{ISB_Spells:{data:[{id:"${getRandomSpell()}",index:0,level:${benchmark},locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}`
    ));

    offer.maxUses = 1;
    offer.setRewardExp(false);
    merchant.offers.add(offer);
}

function getMerchantForgingQuality(random) {
    return weightedForgingString({
        poor: 0.2,
        well: 0.6,
        expert: 0.1,
        perfect: 0.07,
        master: 0.03
    }, random);
}

function weightedForgingString(weights, random) {
    let entries = [];

    for (let key in weights) {
        let weight = Number(String(weights[key]).replace(/[^\d.-]/g, ""));
        if (!isNaN(weight) && weight > 0) {
            entries.push([key, weight]);
        }
    }

    let total = entries.reduce((sum, [, w]) => sum + w, 0);
    if (total <= 0 || entries.length === 0) return "poor";

    let roll = random.nextFloat() * total;
    let cumulative = 0;

    for (let [key, weight] of entries) {
        cumulative += weight;
        if (roll < cumulative) return key;
    }

    return entries[0][0];
}

MerchantEvents.afterTrade(event => {
    let player = event.player;
    if (!(player instanceof $ServerPlayer)) return;

    let coins = event.offer.firstInput;
    if (coins.id != 'darkages:coin') return

    let award = coins.count;
    changeNetWorth(player, 'add', award);
})

MerchantEvents.afterTrade(event => {
    let player = event.player;
    if (!(player instanceof $ServerPlayer)) return;

    let output = event.offer.output;
    if (output.id != 'darkages:contract') return;

    let c = output.nbt?.Contract;
    if (!c) return;

    if (c.houseID !== undefined) {
        if (c.Town == getTownName(player)) {
            buyHouse(player, c.houseID);
        }
        return;
    }
});