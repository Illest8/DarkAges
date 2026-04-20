
function getTown(player) {
  const data = $PlayerSaveData.get(player);
  const manager = $VillageManager.get(player.level);
  const town = data.getLastSeenVillage(manager);

  if (!town.isPresent()) return false;
  return town.get();
}

function getTownName(player) {
  let town = getTown(player)
  return town.name;
}

function getTownBuildings(player) {
  let town = getTown(player)
  if (!town) return false;
  return town.getBuildings().values();
}

function getTownBuilding(player, pos) {
  let town = getTown(player);
  if (!town) return false;

  let javaPos = new $BlockPos(pos.x, pos.y, pos.z);

  let optional = town.getBuildingAt(javaPos);
  if (!optional || !optional.isPresent()) return false;

  return optional.get();
}

function findTownBuilding(player, buildingType) {
  let town = getTown(player);
  if (!town) {
    if (player.isCreative()) {
      player.tell('You are not in a town.');
    }
    return false;
  }

  let buildings = town.getBuildingsOfType(buildingType).toArray();

  for (let building of buildings) {
    if (building.center) {
      return building.center;
    }
  }

  return null;
}

function getBuildingBlock(player, block) {
  let building = getTownBuilding(player, player.blockPosition())
  if (!building) {
    player.tell('No building here.');
    return false;
  }
  let hasBlock = building.getBlockPosStream().anyMatch(pos => {
    let checkedBlock = player.level.getBlock(pos);
    return checkedBlock.id === block
  })
  return hasBlock ? true : false
}

function refreshBuilding(building, level) {
  if (!building) return;

  building.validateBlocks(level);

  const HashSet = Java.loadClass('java.util.HashSet');
  const emptySet = new HashSet();

  building.validateBuilding(level, emptySet);
}

function getPurchasableHouse(player) {
  let town = getTown(player);
  if (!town) return [];

  let validHouses = [];
  let houseTypes = ['armorer', 'farm', 'scribe'];

  houseTypes.forEach(type => {
    town.getBuildingsOfType(type).forEach(building => {
      if (building.getId().toString().length < 4) {
        validHouses.push({
          id: building.getId(),
          center: building.center,
          building: building,
          type: building.getType()
        });
      }
    });
  });

  return validHouses;
}

function buyHouse(player, id) {
  let houses = getPurchasableHouse(player);

  const numericId = Number(id);

  const availableHouse = houses.find(h => h.id === numericId);

  if (!availableHouse) {
    player.tell("§cThat house is not available.");
    return;
  }

  availableHouse.building.setId(playerKey(player));

  let center = availableHouse.center;
  let typeName = capitalize(availableHouse.type.toString())
  createWaypoint(player, typeName, center, 'FFAA00')
  player.tell(`§5You now own a ${typeName} at §b${center.x}, ${center.z}.`);
}

function ownedBuilding(player) {
  let building = getTownBuilding(player, player.blockPosition());
  if (building == false) return false;
  if (building.getId() == playerKey(player)) return true;
  return false
}