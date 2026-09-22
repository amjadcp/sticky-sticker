import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { OrderModalProvider } from './context/OrderModalContext';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <OrderModalProvider>
        <AppRoutes />
        <WhatsAppFloatingButton />
      </OrderModalProvider>
    </BrowserRouter>
  );
};

export default App;
