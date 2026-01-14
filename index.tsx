import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Falha ao encontrar o elemento root. O HTML pode estar mal formado.");
}

const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Erro fatal na renderização:", error);
  rootElement.innerHTML = `<div style="padding: 20px; color: white; background: #0f172a; font-family: sans-serif;">
    <h1>Ops! O Portal encontrou um erro de carregamento.</h1>
    <p>Por favor, tente recarregar a página ou limpe o cache do seu navegador.</p>
    <button onclick="location.reload()" style="padding: 10px 20px; background: #f59e0b; border: none; border-radius: 5px; cursor: pointer;">Recarregar Agora</button>
  </div>`;
}