const express  = require("express");
const { WebSocketServer } = require("ws");
const path = require("path");
const gameServer = require("./GameServer.js");

const app = express();
const wss = new WebSocketServer({ noServer: true });

// Set up static files

app.use(express.static("./Build"));

const server = app.listen(4000, () => {
    console.log("Server is listening at port 4000");
})

app.get("/", (req, res) => {});

// Handles upgrades for websocket connections and adds to client to the GameServer stuff

server.on("upgrade", (req, socket, header) => {

    wss.handleUpgrade(req, socket, header, ws => {
        ws.binaryType = "arraybuffer";

        gameServer.addClient(ws);
    })

})