import { Server } from 'http';
import WebSocket from 'ws';

import * as ConnectionService from './resources/connections/connection.service';
import * as MessageService from './resources/messages/message.service';
import { SocketTypes } from './constants/SocketTypes';

interface IWebSocketData<T = any> {
  type: SocketTypes;
  sessionId: string;
  payload?: T;
}

interface IWebSocketServerExtend extends WebSocket.Server {
  broadcast: (data: IWebSocketData) => void;
}

interface IWebSocketExtend extends WebSocket {
  sessionId: string;
}

const broadcast = (wss: IWebSocketServerExtend) => (data: IWebSocketData) => {
  wss.clients.forEach((client: any) => {
    if (client.sessionId === data.sessionId) return;
    client.send(JSON.stringify(data));
  });
};

export const connectWS = async (server: Server) => {
  const wss = new WebSocket.Server({ server, path: '/ws' }) as IWebSocketServerExtend;

  wss.broadcast = broadcast(wss);

  wss.on('connection', async (ws: IWebSocketExtend) => {
    const { id: sessionId } = await ConnectionService.create({});
    ws.sessionId = sessionId;

    ws.on('message', async (message: string) => {
      const data = JSON.parse(message) as IWebSocketData<string>;
      const { type, payload } = data;
      data.sessionId = sessionId;

      switch (type) {
        case SocketTypes.MESSAGE:
          if (!payload) return;
          await MessageService.create({ session: ws.sessionId, body: payload });
          wss.broadcast(data);
          break;
        case SocketTypes.ALL_ACTIVE_CONNECTIONS:
          const response = JSON.stringify({
            type: SocketTypes.ALL_ACTIVE_CONNECTIONS,
            sessionId,
            payload: Array.from(wss.clients).length,
          });
          ws.send(response);
          break;
        default:
          console.log('Socket type is not defined!');
      }
    });

    ws.on('close', async () => {
      await ConnectionService.deleteById(ws.sessionId);
      wss.broadcast({ type: SocketTypes.DISCONNECTION, sessionId });
    });

    ws.on('error', async () => {
      await ConnectionService.deleteById(ws.sessionId);
      wss.broadcast({ type: SocketTypes.DISCONNECTION, sessionId });
    });

    const data = { type: SocketTypes.CONNECTION, sessionId };
    wss.broadcast(data);
    ws.send(JSON.stringify(data));
  });

  return wss;
};
