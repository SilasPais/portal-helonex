
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Definição de tipos para evitar erros de TS
const env = (import.meta as any).env || {};

// Fallback seguro se as variáveis não existirem
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://uqyqtcaxwlwwomjzekgg.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXF0Y2F4d2x3d29tanpla2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NzA3NjIsImV4cCI6MjA4MzU0Njc2Mn0.On3R9uIXeLfv1br86cAsgsChmmWg0ctmG0zRr8xJJ4I';

let client: SupabaseClient;

try {
  // Validação básica de URL para evitar crash do construtor
  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    throw new Error('URL do Supabase inválida');
  }
  
  client = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error("Falha crítica ao iniciar Supabase. Entrando em modo Offline.", error);
  
  // Mock Client para evitar crash total da aplicação
  client = {
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
    channel: () => ({
      on: () => ({ subscribe: () => {} }),
      subscribe: () => {}
    }),
    removeChannel: () => {},
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  } as unknown as SupabaseClient;
}

export const supabase = client;
