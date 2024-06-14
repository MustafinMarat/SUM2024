import http from 'node:http';
import fs from 'node:fs/promises';
import process from 'node:process';
import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("client")); 

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

let allMessages = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    let info = JSON.parse(message.toString())
    if (info.author == "System") 
      ws.send(JSON.stringify({"author": "System", "message": "Invalid message or name."}));
    else if (info.message != "" && info.message != "\n") {
      info.id = allMessages.length;
      allMessages.push(info);
      for (let client of wss.clients)
        client.send(JSON.stringify(info));
    }
  });

  for (let mess of allMessages)
    ws.send(JSON.stringify(mess));
});

const host = 'localhost';
const port = 3030;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
