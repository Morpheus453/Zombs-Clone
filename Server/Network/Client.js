const { Codec } = require("../Shared/codec.js");
const { packetMaps } = require("../../Shared/packetMaps.js");

const codec = new Codec();

export class Client {
    constructor (server, websocket) {
        this.gameServer = server;
        this.websocket = websocket;

        // eid is short for entity id, it's separate since the actual entity for the player is stored separately

        this.id = Math.floor(Math.random() * Date.now());
        this.eid = Math.floor(Math.random() * Date.now());

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
        this.gameServer.addEntity(this.eid, this);
    }
}