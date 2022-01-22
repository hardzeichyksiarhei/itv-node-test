import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Form, Input, message, notification } from 'antd';

import '../styles/dashboard.scss';

import appState from '../store/appState';
import { SocketTypes } from '../constants/SocketTypes';

import { WS_API_URL } from '../config';

interface ISocketData {
  type: SocketTypes;
  sessionId: string;
  payload?: any;
}

const Dashboard = observer(() => {
  const [form] = Form.useForm();

  useEffect(connectToSocket, []);

  const onWebSocketOpen = () => {
    appState.setIsConnectToSession(true);
    appState.setIsLoadingConnectToSession(false);
  };

  const onWebSocketMessage = (event: MessageEvent) => {
    const { type, sessionId, payload } = JSON.parse(event.data) as ISocketData;

    switch (type) {
      case SocketTypes.CONNECTION:
        if (appState.sessionId && sessionId !== appState.sessionId) {
          message.info(`Client are connected to a session (${sessionId})`);
          break;
        }
        message.success(`You are connected to a session (${sessionId})`);
        appState.setSessionId(sessionId);
        break;
      case SocketTypes.DISCONNECTION:
        message.warning(`Client are disconnected from a session (${sessionId})`);
        break;
      case SocketTypes.MESSAGE:
        notification.open({
          message: `Client: #${sessionId}`,
          description: `Message: ${payload}`,
        });
        break;
      case SocketTypes.ALL_ACTIVE_CONNECTIONS:
        message.info(`Number of active connections: ${payload}`);
        break;
      default:
        console.log('Socket type is not defined!');
    }
  };

  const onWebSocketClose = () => {
    appState.setSocket(null);
    appState.setIsConnectToSession(false);
  };

  const onWebSocketError = () => () => {
    appState.setSocket(null);
    appState.setIsConnectToSession(false);
  };

  function connectToSocket() {
    const socket = new WebSocket(WS_API_URL);
    appState.setSocket(socket);
    appState.setIsLoadingConnectToSession(true);

    socket.addEventListener('open', onWebSocketOpen);
    socket.addEventListener('message', onWebSocketMessage);
    socket.addEventListener('close', onWebSocketClose);
    socket.addEventListener('error', onWebSocketError);
  }

  function disconnectFromSocket() {
    const socket = appState.socket;
    if (!socket) return;

    socket.close();
    message.warning(`You are disconnected from a session (${appState.sessionId})`);
    appState.setSessionId(null);
  }

  const onShowAllActiveConnections = () => {
    if (!appState.socket) return;
    appState.socket.send(
      JSON.stringify({ type: SocketTypes.ALL_ACTIVE_CONNECTIONS, sessionId: appState.sessionId })
    );
  };

  const onFinish = (values: any) => {
    if (!appState.socket) return;
    appState.socket.send(
      JSON.stringify({
        type: SocketTypes.MESSAGE,
        sessionId: appState.sessionId,
        payload: values.message,
      })
    );

    message.success(`Message sended!`);
    form.resetFields();
  };

  const ToggleSession = !appState.isConnectToSession ? (
    <Button
      type="primary"
      loading={appState.isLoadingConnectToSession}
      disabled={appState.isLoadingConnectToSession}
      onClick={connectToSocket}
    >
      Сonnect to web socket
    </Button>
  ) : (
    <Button
      type="primary"
      loading={appState.isLoadingConnectToSession}
      disabled={appState.isLoadingConnectToSession}
      onClick={disconnectFromSocket}
      danger
    >
      Disconnect from web socket
    </Button>
  );

  return (
    <div className="dashboard-page">
      <Card
        style={{ width: 800 }}
        actions={[
          <Button
            type="primary"
            onClick={() => form.submit()}
            disabled={!appState.isConnectToSession}
          >
            Send Message
          </Button>,
          ToggleSession,
          <Button
            type="primary"
            onClick={onShowAllActiveConnections}
            disabled={!appState.isConnectToSession}
            ghost
          >
            Show active connections
          </Button>,
        ]}
      >
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <Input placeholder="Input your message" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
});

export default Dashboard;
