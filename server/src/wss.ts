import { Server } from 'http';
import WebSocket from 'ws';

import * as ConnectionService from './resources/connections/connection.service';
import * as MessageService from './resources/messages/message.service';
import { SocketTypes } from './constants/SocketTypes';

interface IWebSocketExtend extends WebSocket {
  sessionId: string;
}

interface IWebSocketData<T> {
  type: SocketTypes;
  payload?: T;
}

export const connectWS = async (server: Server) => {
  const wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', async (ws: IWebSocketExtend) => {
    const { id: sessionId } = await ConnectionService.create({});
    ws.sessionId = sessionId;

    ws.on('message', async (message: string) => {
      const { type, payload } = JSON.parse(message) as IWebSocketData<string>;

      switch (type) {
        case SocketTypes.MESSAGE:
          if (!payload) break;
          await MessageService.create({ session: ws.sessionId, body: payload });
          break;
        case SocketTypes.ALL_ACTIVE_CONNECTIONS:
          const response = JSON.stringify({
            type: SocketTypes.ALL_ACTIVE_CONNECTIONS,
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
    });

    ws.send(JSON.stringify({ type: SocketTypes.CONNECTION, payload: ws.sessionId }));
  });

  return wss;
};
