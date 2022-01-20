import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Form, Input } from 'antd';

import '../styles/dashboard.scss';

import appState from '../store/appState';

const Dashboard = observer(() => {
  const [form] = Form.useForm();

  const isConnectToSession = true;

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000/ws`);
    appState.setSocket(socket);

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ messige: 'Hello Server!' }));
    });

    socket.addEventListener('message', (message) => {
      console.log(message.data);
    });
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const ToggleSession = !isConnectToSession ? (
    <Button type="primary">Сonnect to web socket</Button>
  ) : (
    <Button type="primary" danger>
      Disconnect from web socket
    </Button>
  );

  return (
    <div className="dashboard-page">
      <Card
        style={{ width: 800 }}
        actions={[
          <Button type="primary" onClick={() => form.submit()}>
            Send Message
          </Button>,
          ToggleSession,
          <Button type="primary" ghost>
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
