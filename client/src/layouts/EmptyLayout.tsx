import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const EmptyLayout: React.FC = () => {
  const currentDate = useRef<Date>(new Date());

  return (
    <Layout className="empty-layout">
      <Header>
        <span className="logo">ITV Node Test</span>
      </Header>
      <Content style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
        <div className="empty-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ITV Node Test © {currentDate.current.getFullYear()} Created by{' '}
        <a href="https://github.com/hardzeichyksiarhei" target="_blank" rel="noopener noreferrer">
          @hardzeichyksiarhei
        </a>
      </Footer>
    </Layout>
  );
};

export default EmptyLayout;
