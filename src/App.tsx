import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { OrderModalProvider } from './context/OrderModalContext';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <OrderModalProvider>
        <AppRoutes />
      </OrderModalProvider>
    </BrowserRouter>
  );
};

export default App;
