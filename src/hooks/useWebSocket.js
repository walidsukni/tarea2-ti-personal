import { useEffect, useRef } from "react";

const WS_URL = "wss://tarea-2.2025-1.tallerdeintegracion.cl/connect";

export const useWebSocket = (onMessage) => {
  const socketRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  useEffect(() => {
    const connect = () => {
      const socket = new WebSocket(WS_URL);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket conectado");

        // Autenticación
        socket.send(JSON.stringify({
          type: "AUTH",
          name: "Walid Sukni",
          student_number: "20251234"
        }));
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          onMessage(message);
        } catch (err) {
          console.error("❌ Error al parsear mensaje:", err);
        }
      };

      socket.onerror = (error) => {
        console.error("⚠️ WebSocket error:", error);
      };

      socket.onclose = () => {
        console.warn("🔌 WebSocket cerrado. Reintentando en 5 segundos...");
        retryTimeoutRef.current = setTimeout(connect, 5000); // Reintenta después de 5s
      };
    };

    connect();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [onMessage]);

  return socketRef;
};
