const Vector = require("../../../Shared/Vector.js");
const Entity = require("./Entity.js");

module.exports = class Circle extends Entity {
    constructor (label, id, world, radius) {
        super(label, id, { x: Math.floor(Math.random() * world.width), y: Math.floor(Math.random() * world.height) })

        // Label is for differentiationg between player, tree, stone, etc.
        // Position should be a vector as shown in the shared folder
        this.radius = radius;
    }
}
