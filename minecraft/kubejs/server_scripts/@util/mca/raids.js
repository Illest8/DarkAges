function spawnRaiders(player, town, direction, count) {
    try {
        let box = town.box;
        let center = box.getCenter();

        let spawnPos = {};

        if (direction === "east") {
            spawnPos.x = box.maxX() + 20;
            spawnPos.z = Math.floor(center.z);
        }
        if (direction === "west") {
            spawnPos.x = box.minX() - 20;
            spawnPos.z = Math.floor(center.z);
        }
        if (direction === "north") {
            spawnPos.x = Math.floor(center.x);
            spawnPos.z = box.minZ() - 20;
        }
        if (direction === "south") {
            spawnPos.x = Math.floor(center.x);
            spawnPos.z = box.maxZ() + 20;
        }

        spawnPos.y = player.level.getHeight("WORLD_SURFACE", spawnPos.x, spawnPos.z);

        for (let i = 0; i < count; i++) {
            let viking = player.level.createEntity('darkages:viking');
            viking.setPosition(spawnPos.x, spawnPos.y, spawnPos.z + i);

            if (player.isCreative()) player.tell(spawnPos.x + ' ' + spawnPos.z)

            viking.addTag("raid_" + direction);
            viking.persistentData.direction = direction;

            viking.setPersistenceRequired();

            viking.spawn();
        }
    } catch (error) {
        console.log(error)
    }
}