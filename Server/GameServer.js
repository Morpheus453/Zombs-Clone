const Client = require("./Network/Client.js");
const Codec = require("../Shared/codec.js");
const World = require("./World/World.js");

const codec = new Codec();

class GameServer {
    constructor () {
        this.clients = [];
        this.world = new World();

        this.TICK_RATE = 50;

        // Stuff for calculating delta time

        this.lastUpdated = Date.now();

        // Start server ticking

        setInterval(this.tick.bind(this), this.TICK_RATE);
    }

    tick () {
        let now = Date.now();
        let dt = now - this.lastUpdated;

        this.world.update(dt);

        this.lastUpdated = now;
    }

    addClient (socket) {
        this.clients.push(new Client(this, socket));
    }
}

const gameServer = new GameServer()

module.exports = gameServer;
