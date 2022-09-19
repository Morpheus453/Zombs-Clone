const path = require("path");

const isProduction = false;

const config = {
    entry: "./Client/script.js",
    mode: isProduction ? "production" : "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "Build")
    }
}

module.exports = config;