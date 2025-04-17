import { useCallback, useState } from "react";
import GlobeView from "./components/GlobeView";
import Chat from "./components/Chat";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);
  const [messages, setMessages] = useState([]);
  const [wsInstance, setWsInstance] = useState(null);

  const handleMessage = useCallback((message) => {
    console.log("Mensaje recibido:", message); 

    if (message.type === "POSITION_UPDATE") {
      setSatellites(message.satellites);

      const ids = message.satellites.map(s => s.satellite_id);
      console.log("🛰️ Satélites recibidos:", [...new Set(ids)]);
    }

    if (message.type === "COMM") {
      console.log("Mensaje COMM:", message.message);
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
