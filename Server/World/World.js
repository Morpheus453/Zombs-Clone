const Circle = require("../World/Physics/Circle.js");
const Vector = require("../../Shared/Vector.js");

module.exports = class World {
    constructor (width = 1000, height = 1000) {
        // Entities are stored as a map so that it's easy to iterate and query
        this.entities = new Map();

        // For now the spacial hash just pushes all of the entity ids into this one object
        // In the future it will be broken up into different sections so that you can quickly
        // Find nearby entities without having to loop through every single one

        this.spacialHash = {
            "0x0": [

            ]
        }

        // World bounds

        this.width = width;
        this.height = height;
    }

    clearSpacialHash () {
        // In the future this will loop through every section and clear them
        this.spacialHash = {
            "0x0": [
                
            ]
        };
    }

    updateSpacialHash () {
        this.clearSpacialHash();

        for (let [id, entity] of this.entities) {
            this.spacialHash["0x0"].push(id);
        }
    }

    update (dt) {
        // TODO
        this.updateSpacialHash();
    }

    addPlayer (client) {
        this.entities.set(client.id, new Circle("player", client.id, this, 25));

        console.log(this.entities.get(client.id));
    }

    getInSight (client) {
        // For now it just returns all entities for testing

        return this.spacialHash["0x0"];
    }
}
