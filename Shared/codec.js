import { packetMaps } from "./packetMaps.js";
import { packets } from "./packets.js"
import * as msgpack from "msgpack-lite";

// Uses msgpack for the actual encoding/decoding, codec is just a class that brings everything together
// And makes it easier to debug

export class Codec {
    constructor () {

    }

    validateParams (required, inputted) {
        let valid = true;

        Object.entries(required).forEach(data => {

            try {
                let found = false;

                Object.entries(inputted).forEach(data2 => {

                    if (data[0] == data2[0]) {
    
                        if (typeof data[1] != typeof data2[1]) throw `ERROR: Parameter ${data2[0]} has typeof ${typeof data2[1]} when it should be ${typeof data[0]}`;
    
                        found = true;
                    }
    
                })
    
                if (!found) throw `ERROR: Missing parameter ${data[0]} while encoding`;
            } catch (error) {
                console.error(error);
                valid = false;
            }

        })

        return valid;
    }

    //

    encode (message, checking = true) {
        try {
            if (checking) {
                if (!packetMaps[message.type]) throw `ERROR: Type ${message.type} is not in map`;

                let valid = this.validateParams(packets[message.type], message.options);
                
                if (!valid) return;
            }

            return msgpack.encode(message);
        } catch (error) {
            console.error(error);
        }
    }

    // Don't need to validate the stuff because we can assume data sent by the server already has the correct values
    // Probably not the best practice but idk

    decode (buffer) {
        return msgpack.decode(new Uint8Array(buffer));
    }
}
