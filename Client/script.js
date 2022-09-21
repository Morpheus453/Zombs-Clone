import { Renderer } from "./renderer.js";
import Codec from "../Shared/codec.js";
import packetMaps from "../Shared/packetMaps.js";
import packets from "../Shared/packets";

// In the future this will be more fleshed out and preferably its own class
// This is just for testing purposes

const codec = new Codec();
var ws;
var myId;

function connect () {
    // Assuming the location is localhost
    ws = new WebSocket("ws://" + window.location.hostname + ":4000/");

    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
        ws.send(codec.encode({
            type: 0,
            options: {
                name: "test",
            }
        }))
    }

    ws.onmessage = m => {
        let msg = codec.decode(m.data);

        console.log(msg);

        switch (packetMaps[msg.type]) {
            case "JOIN_RESPONSE":
                myId = msg.options.id;
                console.log(myId);
                break;
            case "WORLD_DATA":
                console.log(msg.options.entities);
                break;
        }
    }
}

connect();
