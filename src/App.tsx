import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientsProvider } from './context/ClientsContext';

const App: React.FC = () => {
  return (
    <ClientsProvider>
      <Outlet />
    </ClientsProvider>
  );
};

export default App;
