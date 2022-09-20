const { Client } = require("./Network/Client.js");
const { Codec } = require("../Shared/codec.js");

const codec = new Codec();

class GameServer {
    constructor () {
        this.clients = [];
    }

    broadcast (msg) {
        // Encode the message before sending it that way it doesn't have to encode the same
        // Message over and over again 

        msg = codec.encode(msg);

        for (let i = 0; i < this.clients.length; i++) {
            this.clients[i].websocket.send(msg);
        }
    }

    addClient (socket) {
        this.clients.push(new Client(this, socket));
    }

    addEntity (eid, client) {
        // TODO
    }
}

const gameServer = new GameServer()

module.exports = gameServer;
