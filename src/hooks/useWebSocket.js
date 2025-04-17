import { useEffect, useRef } from "react";

const WS_URL = "wss://tarea-2.2025-1.tallerdeintegracion.cl/connect";

export const useWebSocket = (onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket conectado");

      // ENVÍA AUTENTICACIÓN AL SERVIDOR
      socket.send(JSON.stringify({
        type: "AUTH",
        name: "Walid Sukni",        
        student_number: "18626084"  
      }));
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("🔁 Mensaje recibido:", message);
        onMessage(message);
      } catch (err) {
        console.error("❌ Error al parsear mensaje:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("⚠️ Error WebSocket:", error);
    };

    socket.onclose = () => {
      console.warn("🔌 WebSocket cerrado");
    };

    return () => {
      socket.close();
    };
  }, [onMessage]);

  return socketRef;
};
