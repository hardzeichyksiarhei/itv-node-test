import { Server } from 'http';
import WebSocket from 'ws';

import * as ConnectionService from './resources/connections/connection.service';

interface IWebSocketExtend extends WebSocket {
  sessionId: string;
}

export const connectWS = async (server: Server) => {
  const wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', async (ws: IWebSocketExtend) => {
    const { id: sessionId } = await ConnectionService.create({});
    ws.sessionId = sessionId;

    ws.on('message', (message: string) => {
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
    });

    ws.on('close', async () => {
      await ConnectionService.deleteById(ws.sessionId);
    });

    ws.send(`Session #${ws.sessionId} connected!`);
  });

  return wss;
};
