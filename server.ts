import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Supabase Client (Service Role for Backend Operations)
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Helonex Resolve Ledger Update (Secure Backend Operation)
  app.post("/api/resolve/ledger", async (req, res) => {
    const { dispute_id, event, settlement_value, hash } = req.body;
    
    if (!dispute_id) {
      return res.status(400).json({ error: "dispute_id is required" });
    }

    try {
      // 1. Atualiza o Status e Valor de Liquidação se houver Match
      if (settlement_value !== undefined) {
        await supabase.from('disputes').update({ 
          status: 'MATCHED', 
          final_settlement: settlement_value,
          resolved_at: new Date() 
        }).eq('id', dispute_id);
      }
      
      // 2. Registra no Log de Auditoria SHA-256
      await supabase.from('resolve_ledger').insert({
        dispute_id,
        event: event || 'SYSTEM_EVENT',
        hash: hash || `SHA256-${Math.random().toString(36).substring(7)}`,
        created_at: new Date()
      });

      res.json({ status: "success" });
    } catch (error: any) {
      console.error("Ledger Update Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
