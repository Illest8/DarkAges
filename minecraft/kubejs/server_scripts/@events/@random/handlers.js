// events/handlers.js

function spawnAroundPlayer(player, entityId, count, nbt) {
    let level = player.level;
    let pos = player.blockPosition();

    let offsets = [
        { x: 2, z: 0 },
        { x: -2, z: 1 },
        { x: 0, z: -2 }
    ];

    for (let i = 0; i < count; i++) {
        let off = offsets[i % offsets.length];
        let e = level.createEntity(entityId);
        if (!e) continue;

        if (nbt) e.mergeNbt(nbt);

        e.x = pos.x + off.x + 0.5;
        e.y = pos.y + 1;
        e.z = pos.z + off.z + 0.5;
        e.spawn();
    }
}

function pickWeighted(pool) {
    let total = pool.reduce((s, e) => s + (e.weight || 1), 0);
    let roll = Math.random() * total;

    for (let e of pool) {
        roll -= (e.weight || 1);
        if (roll <= 0) return e;
    }
    return pool[0];
}

function pickConditional(pool, server, player) {
    let available = pool.slice();

    while (available.length > 0) {
        let e = pickWeighted(available);
        if (!e.condition || e.condition(server, player)) return e;
        available = available.filter(x => x !== e);
    }
    return null;
}