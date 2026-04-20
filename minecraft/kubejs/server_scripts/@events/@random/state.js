// events/state.js
//priority 998

global.EventState = {
    data: { players: {} },

    path(server) {
        return "saves/" + server.getWorldData().levelName + "/serverconfig/events.json";
    },

    load(server) {
        const path = this.path(server);
        this.data = JsonIO.read(path) || { players: {} };
        return this.data;
    },

    save(server) {
        const path = this.path(server);
        JsonIO.write(path, this.data);
    }
};

ServerEvents.loaded(event => {
    const server = event.server;
    if (server.persistentData.eventsLoaded) return;

    global.EventState.load(server);
    server.persistentData.eventsLoaded = true;

    console.log("[SeasonEvent] events.json initialized.");
});