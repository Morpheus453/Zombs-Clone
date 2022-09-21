const Codec  = require("../../Shared/codec.js");
const packetMaps = require("../../Shared/packetMaps");

console.log(Codec);
const codec = new Codec();

module.exports = class Client {
    constructor (server, websocket) {
        this.gameServer = server;
        this.websocket = websocket;

        this.id = Math.floor(Math.random() * Date.now());

        this.name = "Player";

        this.websocket.on("message", msg => {
            this.onMessage(msg);
        });

        this.websocket.on("close", () => {
            this.onClose()
        })
    }

    send (msg) {
        this.websocket.send(this.codec.encode(msg));
    }

    onClose () {
        
    }

    onMessage (msg) {
        msg = codec.decode(msg);

        switch (packetMaps[msg.type]) {
            case "REQUEST_JOIN":
                this.onRequestJoin(msg.options);
                break;
        }
    }

    onRequestJoin (params) {
        if (!params.name || typeof params.name != 'string') return;

        this.name = params.name;
        this.gameServer.world.addPlayer(this);
    }
}
