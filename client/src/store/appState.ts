import { makeAutoObservable } from 'mobx';

class AppState {
  socket: WebSocket | null = null;
  sessionId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }
}

export default new AppState();
