import http from 'node:http';
import fs from 'node:fs/promises';
import process from 'node:process';
import express, { text } from "express";
import { WebSocketServer } from "ws";
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

app.use(express.static("client")); 

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

async function main() {
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);
  const database = "Messages";
  const connection = await client.connect();
  const db = connection.db(database);
  const collection = db.collection("Messages");

  wss.on("connection", async (ws) => {
    ws.on("message", (message) => {
      let info = JSON.parse(message.toString())
      if (info.author == "System") 
        ws.send(JSON.stringify({"author": "System", "message": "Invalid message or name."}));
      else if (info.message != "" && info.message != "\n") {
        collection.insertOne(info);
        for (let client of wss.clients)
          client.send(JSON.stringify(info));
      }
    });
  
    const msg = await collection.find({}).toArray();
    msg.forEach((info) => {
      ws.send(JSON.stringify(info));
    })
  });  
}

main();

const host = 'localhost';
const port = 3030;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
