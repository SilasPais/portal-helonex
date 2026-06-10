
import { guardianEngine } from './guardianSystem';

export type NotificationCategory = 'URGENT' | 'EDUCATION' | 'PERFORMANCE' | 'SYSTEM';

interface HelonexNotification {
  title: string;
  body: string;
  category: NotificationCategory;
  actionUrl?: string;
}

export const notificationService = {
  // Solicita permissão ao navegador
  requestPermission: async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.warn("Este navegador não suporta notificações desktop.");
      return false;
    }

    if (Notification.permission === "granted") return true;

    const permission = await Notification.requestPermission();
    return permission === "granted";
  },

  // Envia a notificação nativa (Windows/Android/Mac)
  sendNative: (data: HelonexNotification) => {
    if (Notification.permission === "granted") {
      const icon = "/favicon.ico"; // Usar ícone do sistema
      const n = new Notification(data.title, {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/1161/1161388.png', // Ícone de alerta/caminhão
        badge: 'https://cdn-icons-png.flaticon.com/512/1161/1161388.png',
        tag: data.category,
      });

      n.onclick = () => {
        window.focus();
        if (data.actionUrl) window.location.href = data.actionUrl;
        n.close();
      };
    }
  },

  // Lógica de agendamento de dicas (Simulado)
  scheduleSmartAlerts: () => {
    const alerts: HelonexNotification[] = [
      {
        title: "🛡️ BLOQUEIO EVITADO",
        body: "Sua RNTRC venceria em 2 dias. O Guardião Helonex já iniciou o protocolo de renovação automática.",
        category: "URGENT"
      },
      {
        title: "🚛 DICA DE PERFORMANCE",
        body: "A Helô notou que a rota SP-RJ está com custo/km 12% acima da média. Veja como otimizar o frete.",
        category: "PERFORMANCE"
      },
      {
        title: "🎓 ACADEMIA HELONEX",
        body: "Nova aula disponível: Como usar a Autodenúncia para anular multas leves da ANTT.",
        category: "EDUCATION"
      }
    ];

    // Dispara um alerta aleatório a cada 2 minutos (para demonstração)
    setInterval(() => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      notificationService.sendNative(randomAlert);
    }, 120000);
  }
};
