import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';
import { validChessNotation } from './public/chess';

const app = express();
const PORT = 3000;

app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  let username: string;
  let color: string;

  ws.on('message', (message) => {
    const recievedJson = JSON.parse(message as any);
    const type = recievedJson.type;
    if (type === 'username') {
      username = recievedJson.message;
      color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    }
    else if (type === 'chat') {
      if (validChessNotation(recievedJson.message)) {
        echoChatRoom(username ?? " ", color ?? "red", recievedJson.message);
      }
    }

  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    echoChatRoom(username, color, "has left the chat");
  });

});

function echoChatRoom(username:string, color: string, message: string): void {
  wss.clients.forEach((c) => {
    c.send(JSON.stringify({
      username: username,
      color: color,
      message: message
    }));
  })
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
