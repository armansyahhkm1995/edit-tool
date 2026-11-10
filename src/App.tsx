import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </ToastProvider>
  );
};

export default App;
