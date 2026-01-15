
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Render Error:", error);
    // Fallback UI em caso de erro catastrófico no render
    container.innerHTML = `<div style="padding: 20px; color: white; background: #0f172a; font-family: sans-serif;">
      <h2>Erro ao carregar o portal</h2>
      <p>Houve um problema na renderização dos componentes. Por favor, tente recarregar a página.</p>
      <button onclick="window.location.reload()" style="padding: 10px; background: #f59e0b; border: none; border-radius: 5px; cursor: pointer;">Recarregar Portal</button>
    </div>`;
  }
} else {
  console.error("Critical: Root element not found.");
}
