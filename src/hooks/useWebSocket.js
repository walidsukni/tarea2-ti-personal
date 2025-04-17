import { useEffect, useRef } from "react";

const WS_URL = "wss://tarea-2.2025-1.tallerdeintegracion.cl/connect";

export const useWebSocket = (onMessage) => {
  const ws = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("WebSocket conectado");
      ws.current.send(JSON.stringify({
        type: "AUTH",
        name: "Walid Sukni",
        student_number: "18626084"
      }));
    };

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      onMessageRef.current(message); 
    };

    ws.current.onclose = () => console.log("WebSocket cerrado");
    ws.current.onerror = (e) => console.error("Error WebSocket", e);

    return () => ws.current?.close();
  }, []); 

  return ws.current;
};
