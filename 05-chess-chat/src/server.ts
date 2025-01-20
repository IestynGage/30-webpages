import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';


const app = express();
const PORT = 3000;


app.get('/', (req: Request, res: Response) => {
  const indexPath = path.join(__dirname, 'index.html'); // Adjust path for compiled files
  res.sendFile(indexPath);
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  let messagesRecieved = 0;

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
        // ws.send(`Echo: ${message}`);
    messagesRecieved++;
    ws.send(`Total connections ${[...wss.clients.keys()].length}`);
    ws.send(`Messages recieved ${messagesRecieved}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    wss.clients.forEach(c => {
      c.send(`Client left, total connections ${[...wss.clients.keys()].length}`);
    })
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
