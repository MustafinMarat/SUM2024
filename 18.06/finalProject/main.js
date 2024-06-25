import http from "node:http";
import express from "express";
import { WebSocketServer } from "ws";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

let players = [];

function main() {
  wss.on("connection", async (ws) => {
    ws.on("message", (message) => {
      let info = JSON.parse(message.toString());
      if (info.type == "name")
        players.push({name: info.text, pos: {x: 0, y: 0, z: 0}});
    });
    for (let client of wss.clients)
      if (client != ws)
        client.send(JSON.stringify({type: "start", data: players}));
    ws.send(JSON.stringify())
  });
}

main();

const port = 3030;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
