import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
  const indexPath = path.join(__dirname, 'index.html'); // Adjust path for compiled files
  res.sendFile(indexPath);
});

// app.get('/chess', (req: Request, res: Response) => {
//   console.log("asdsdasd")
//   const indexPath = path.join(__dirname, 'chess.js'); // Adjust path for compiled files
//   res.sendFile(indexPath);
// });

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  let messagesRecieved = 0;


  ws.on('message', (message) => {
    // let a = eval(`${message}`);
    
    // console.log("type", (message as any).type)
    console.log("type2", JSON.parse(message as any).type)
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
