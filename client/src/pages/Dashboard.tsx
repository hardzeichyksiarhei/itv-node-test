import React from 'react';
import { Card, Button, Form, Input } from 'antd';

import '../styles/dashboard.scss';

const Dashboard = () => {
  const [form] = Form.useForm();

  const isConnectToSession = true;

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
};

export default Dashboard;
