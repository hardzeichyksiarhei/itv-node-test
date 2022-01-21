import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Form, Input, message } from 'antd';

import '../styles/dashboard.scss';

import appState from '../store/appState';
import { SocketTypes } from '../constants/SocketTypes';

import { WS_API_URL } from '../config';

interface ISocketData {
  type: SocketTypes;
  payload?: any;
}

const Dashboard = observer(() => {
  const [form] = Form.useForm();

  useEffect(connectToSocket, []);

  function connectToSocket() {
    const socket = new WebSocket(WS_API_URL);
    appState.setSocket(socket);

    socket.addEventListener('open', () => {
      appState.setIsConnectToSession(true);
    });

    socket.addEventListener('message', (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data) as ISocketData;

      switch (type) {
        case SocketTypes.CONNECTION:
          message.info(`You are connected to a session (${payload})`);
          appState.setSessionId(payload);
          break;
        case SocketTypes.ALL_ACTIVE_CONNECTIONS:
          message.info(`Number of active connections: ${payload}`);
          break;
        default:
          console.log('Socket type is not defined!');
      }
    });

    socket.addEventListener('close', () => {
      appState.setSocket(null);
      appState.setIsConnectToSession(false);
    });

    socket.addEventListener('error', () => {
      appState.setSocket(null);
      appState.setIsConnectToSession(false);
    });
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
    appState.socket.send(JSON.stringify({ type: SocketTypes.ALL_ACTIVE_CONNECTIONS }));
  };

  const onFinish = (values: any) => {
    if (!appState.socket) return;
    appState.socket.send(JSON.stringify({ type: SocketTypes.MESSAGE, payload: values.message }));

    form.resetFields();
  };

  const ToggleSession = !appState.isConnectToSession ? (
    <Button type="primary" onClick={connectToSocket}>
      Сonnect to web socket
    </Button>
  ) : (
    <Button type="primary" onClick={disconnectFromSocket} danger>
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
