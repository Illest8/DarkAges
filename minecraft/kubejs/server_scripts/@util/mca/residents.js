function findResidentByName(player, name) {
  const town = getTown(player);
  const lower = name.toLowerCase();

  for (const resident of town.getResidents(player.level)) {
    if (resident.getName().string.toLowerCase() === lower) {
      return resident;
    }
  }

  return null;
}

function getTownProfession(player, professionId) {
  const town = getTown(player);
  if (!town) return false;

  const residents = town.getResidents(player.level).toArray();

  const match = residents.find(r => r.getProfessionId() === professionId);

  return match || false;
}

function getTownResidents(player) {
  let town = getTown(player);
  if (!town) return false;
  let residents = []
  town.getResidents(player.level).forEach(resident => {
    residents.push(resident.getName().getString())
  })
  return residents;
}

// HEARTS

function getResidentHearts(resident, player) {
  const brain = resident.getVillagerBrain();
  if (!brain) return null;

  const memories = brain.getMemoriesForPlayer(player);
  if (!memories) return null;

  return memories.getHearts();
}

function getAllResidentHearts(player) {
  const town = getTown(player);
  const results = [];

  town.getResidents(player.level).forEach(resident => {
    const brain = resident.getVillagerBrain();
    let hearts = null;

    if (brain) {
      const memories = brain.getMemoriesForPlayer(player);
      if (memories) {
        hearts = memories.getHearts();
      }
    }

    results.push({
      name: resident.getName().string,
      hearts: hearts
    });
  });

  return results;
}

function addResidentHearts(resident, player, amount) {
  const brain = resident.getVillagerBrain();
  if (!brain) return false;

  const memories = brain.getMemoriesForPlayer(player);
  if (!memories) return false;

  memories.modHearts(amount);
  return true;
}

function addHeartsToAllResidents(player, amount) {
  const town = getTown(player);
  const results = [];

  town.getResidents(player.level).forEach(resident => {
    const brain = resident.getVillagerBrain();
    let success = false;

    if (brain) {
      const memories = brain.getMemoriesForPlayer(player);
      if (memories) {
        memories.modHearts(amount);
        success = true;
      }
    }

    results.push({
      name: resident.getName().string,
      added: success
    });
  });

  return results;
}