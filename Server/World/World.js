const Circle = require("../World/Physics/Circle.js");
const Vector = require("../../Shared/Vector.js");

module.exports = class World {
    constructor (width = 1000, height = 1000) {
        // Entities are stored as a map so that it's easy to iterate and query
        this.entities = new Map();

        // Bytebuffer has issues with sending a map over the ws so we'll have to convert it into an array
        // I hope it doesn't affect performance too much bc we'll only have to do it
        // Once per tick but we'll see...
        
        this.entitiesAsArray = [];

        // World bounds

        this.width = width;
        this.height = height;
    }

    update (dt) {
        // TODO

        this.entitiesAsArray = Array.from(this.entities);
    }

    addPlayer (client) {
        let pos = Vector.create(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height));

        this.entities.set(client.id, new Circle(pos, 25));

        console.log(this.entities.get(client.id));
    }

    getInSight (entityID) {
        // For now it just returns all entities for testing

        return this.entitiesAsArray;
    }
}