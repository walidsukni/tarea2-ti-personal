import { useState } from "react";
import GlobeView from "./components/GlobeView";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);

  const handleMessage = (message) => {
    console.log("🔁 Mensaje recibido:", message);

    // Usamos POSITION_UPDATE para mantener la lista actualizada
    if (message.type === "POSITION_UPDATE") {
      setSatellites(message.satellites);
      console.log("📡 Satélites actualizados:", message.satellites.length);
    }
  };

  useWebSocket(handleMessage);

  return <GlobeView satellites={satellites} />;
}

export default App;
