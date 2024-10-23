import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CardProvider } from './context/CardContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </AuthProvider>
  </React.StrictMode>
);