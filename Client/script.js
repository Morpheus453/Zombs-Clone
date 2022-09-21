import { Renderer } from "./renderer.js";
import Codec from "../Shared/codec.js";

// In the future this will be more fleshed out and preferably its own class
// This is just for testing purposes

const codec = new Codec();
var ws;

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
}

connect();
