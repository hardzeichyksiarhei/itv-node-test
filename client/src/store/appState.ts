import { makeAutoObservable } from 'mobx';

class AppState {
  socket: WebSocket | null = null;
  sessionId: string | null = null;
  isConnectToSession: boolean = false;
  isLoadingConnectToSession: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket: WebSocket | null) {
    this.socket = socket;
  }

  setSessionId(sessionId: string | null) {
    this.sessionId = sessionId;
  }

  setIsConnectToSession(isConnectToSession: boolean) {
    this.isConnectToSession = isConnectToSession;
  }

  setIsLoadingConnectToSession(isLoadingConnectToSession: boolean) {
    this.isLoadingConnectToSession = isLoadingConnectToSession;
  }
}

export default new AppState();
