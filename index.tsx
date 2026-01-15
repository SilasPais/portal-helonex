
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const startApp = () => {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  };

  // Garante que o SDK Global do Gemini esteja disponível
  if ((window as any).GoogleGenAI) {
    startApp();
  } else {
    // Polling rápido para evitar delay visual
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if ((window as any).GoogleGenAI || attempts > 20) {
        clearInterval(interval);
        startApp();
      }
    }, 100);
  }
} else {
  console.error("Elemento raiz '#root' não encontrado.");
}
