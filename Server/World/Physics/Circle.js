const Vector = require("../../../Shared/Vector.js");

module.exports = class Circle {
    constructor (position, radius) {
        // Position should be a vector as shown in the shared folder

        this.position = position;
        this.radius = radius;

        // Could just do { x: 0, y: 0 } but using Vector.create helps some with clarity

        this.acceleration = Vector.create();
        this.velocity = Vector.create();
    }

    update (dt) {
        // TODO
    }
}