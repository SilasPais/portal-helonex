import React, { ReactNode, Component, ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Garantindo que estilos sejam carregados se existirem

// --- MECANISMO DE SEGURANÇA GLOBAL ---
// Se o React falhar totalmente, isso garante que o usuário veja algo.
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global Error Caught in index.tsx:", message);
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
     root.innerHTML = `
       <div style="color: white; padding: 20px; font-family: sans-serif; text-align: center; margin-top: 50px;">
         <h1 style="color: #ef4444;">Erro Crítico de Inicialização</h1>
         <p>O sistema não conseguiu carregar os módulos principais.</p>
         <button onclick="localStorage.clear(); window.location.reload();" style="padding: 15px 30px; background: #f59e0b; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px;">
           CLIQUE AQUI PARA RESETAR
         </button>
       </div>
     `;
  }
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error Boundary Component para capturar falhas e permitir reset
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('guardian_db'); // Limpa dados corrompidos
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#ef4444' }}>O Sistema Encontrou um Erro Inesperado</h1>
          <p style={{ marginBottom: '24px', color: '#94a3b8', textAlign: 'center', maxWidth: '500px' }}>
            Isso geralmente ocorre devido a dados antigos salvos no navegador que conflitam com a nova versão do sistema.
          </p>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontSize: '12px', fontFamily: 'monospace', maxWidth: '80%', overflow: 'auto' }}>
            {this.state.error?.toString()}
          </div>
          <button 
            onClick={this.handleReset}
            style={{ padding: '12px 24px', backgroundColor: '#f59e0b', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            LIMPAR DADOS E REINICIAR (RESOLVER)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);