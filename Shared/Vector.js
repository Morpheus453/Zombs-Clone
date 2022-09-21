// Based off the matter-js vector bc I'm lazy
// https://brm.io/matter-js/docs/files/src_geometry_Vector.js.html

const Vector = {};

Vector.create = (x = 0, y = 0) => {
    return { x, y };
}

Vector.clone = (vector) => {
    return { x: vector.x, y: vector.y };
}

Vector.magnitude = (vector) => {
    return Math.sqrt(vector.x**2 + vector.y**2);
}

Vector.add = (v1, v2) => {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
}

Vector.subtract = (v1, v2) => {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
}

Vector.divide = (v1, v2) => {
    return { x: v1.x / v2.x, y: v1.y / v2.y };
}

Vector.multiply = (v1, v2) => {
    return { x: v1.x * v2.x, y: v1.y * v2.y };
}

// There are more methods but it's a pain to add all of them and we probably won't need any of the other ones

module.exports = Vector;
