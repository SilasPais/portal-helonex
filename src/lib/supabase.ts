
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isRealClientAvailable = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== '' && 
  supabaseAnonKey !== '' &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('placeholder') &&
  supabaseUrl.startsWith('https://');

// Mock Client (Fallback for when backend is not configured)
const mockClient = {
  from: () => ({
    select: () => ({ 
      eq: () => ({ 
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) 
      }), 
      limit: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  channel: () => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: { id: 'mock-user', email: 'demo@helonex.com' } }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: { id: 'mock-user', email: 'demo@helonex.com' }, session: { access_token: 'mock-token' } }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: "Modo Simulação (Mock)" } }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: (callback: any) => {
      // Simulate a user being logged in immediately for demo purposes if needed, 
      // or just return a subscription.
      // For now, we'll just return a dummy subscription.
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  }
};

export const supabase = isRealClientAvailable 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        lockType: 'memory'
      }
    } as any) 
  : (mockClient as any);

export const isOfflineMode = !isRealClientAvailable;
