import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles/app.scss';

import EmptyLayout from './layouts/EmptyLayout';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
