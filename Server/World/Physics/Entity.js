const Vector = require("../../../Shared/Vector.js");

module.exports = class Entity {
    constructor (label, id, position = { x: 0, y: 0 }) {
        this.label = label;
        this.id = id;

        this.position = position;
        this.acceleration = Vector.create(0, 0);
        this.velocity = Vector.create(0, 0);
    }

    clientInfo () {
        return {
            id: this.id,
            label: this.label,
            position: this.position,
        }
    }
}
