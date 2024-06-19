import http from "node:http";
import express from "express";
import { WebSocketServer } from "ws";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.static("client"));

const server = http.createServer(app);

const port = 3030;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
