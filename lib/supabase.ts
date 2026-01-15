
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// No ambiente Vite, as variáveis de ambiente devem ser acessadas de forma estática para substituição no build.
// Utilizamos o process.env injetado pelo vite.config.ts para máxima compatibilidade.
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://uqyqtcaxwlwwomjzekgg.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXF0Y2F4d2x3d29tanpla2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NzA3NjIsImV4cCI6MjA4MzU0Njc2Mn0.On3R9uIXeLfv1br86cAsgsChmmWg0ctmG0zRr8xJJ4I';

let client: SupabaseClient;

try {
  // Validação de segurança para evitar erro de construtor vazio
  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    throw new Error('Supabase URL inválida.');
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.warn("⚠️ MOTOR HELONEX: Supabase não detectado. Ativando Modo de Segurança (Fallback).", error);
  
  // Mock Client Robusto para garantir que o Portal renderize sem interrupções
  client = {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) 
        }), 
        limit: () => Promise.resolve({ data: [], error: null }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null }),
    }),
    channel: () => ({
      on: () => ({ 
        subscribe: (callback?: (status: string) => void) => {
           if(callback && typeof callback === 'function') callback('CLOSED');
           return { unsubscribe: () => {} };
        } 
      }),
      subscribe: (callback?: (status: string) => void) => {
         if(callback && typeof callback === 'function') callback('CLOSED');
         return { unsubscribe: () => {} };
      },
      unsubscribe: () => {}
    }),
    removeChannel: () => {},
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Modo Offline' } }),
      signOut: () => Promise.resolve({ error: null })
    }
  } as unknown as SupabaseClient;
}

export const supabase = client;
