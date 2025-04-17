import { useCallback, useState } from "react";
import GlobeView from "./components/GlobeView";
import Chat from "./components/Chat";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);
  const [messages, setMessages] = useState([]);
  const [wsInstance, setWsInstance] = useState(null);

  const handleMessage = useCallback((message) => {
    if (message.type === "POSITION_UPDATE") {
      setSatellites(message.satellites);

      if (message.satellites?.length > 0) {
        console.log("📦 Satélite ejemplo recibido:", message.satellites[0]);

        const types = message.satellites
          .map(sat => sat.type)
          .filter(Boolean);

        console.log("Tipos únicos de satélites recibidos:", [...new Set(types)]);
      }
    }

    if (message.type === "COMM") {
      console.log("Mensaje COMM recibido:", message.message);
      setMessages((prev) => [...prev, message.message]);
    }
  }, []);

  const ws = useWebSocket(handleMessage);
  if (ws && !wsInstance) setWsInstance(ws);

  return (
    <>
      <GlobeView satellites={satellites} />
      {wsInstance && (
        <Chat ws={wsInstance} messages={messages} setMessages={setMessages} />
      )}
    </>
  );
}

export default App;
