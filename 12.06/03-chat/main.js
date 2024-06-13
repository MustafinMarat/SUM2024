import http from 'node:http';
import fs from 'node:fs/promises';
import process from 'node:process';
import express from "express";
import { WebSocketServer } from "ws"

const app = express();

app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });
let clients = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message.toString());
    let mess = message.toString();
    for (let client of clients)
      client.send(mess);
  });
  
  // ws.send("Hello, new client");
  clients.push(ws);
});

const host = 'localhost';
const port = 3030;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});