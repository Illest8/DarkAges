MoreJSEvents.playerStartTrading((event) => {
  let { merchant, player } = event;
  if ((!merchant.villagerData)) return;
  let type = merchant.getType();
  if (type == 'mca:female_villager' || type == 'mca:male_villager') {
    let getHearts = getResidentHearts(merchant, player)
    if (getHearts < 0) {
      player.tell(`${event.getMerchant().getNbt().villagerName} does not like you.`)
      event.forEachOffers((o, i) => {
        o.disabled = true;
      })
    }
    if (getHearts >= 0) {
      event.forEachOffers((o, i) => {
        o.setVillagerExperience(getHearts / 2)
        o.disabled = false;
      })
    }
    return;
  }
});