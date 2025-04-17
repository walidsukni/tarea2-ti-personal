import { useState } from "react";
import GlobeView from "./components/GlobeView";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);

  const handleMessage = (message) => {
    console.log("Mensaje recibido:", message);

    if (message.type === "POSITION_UPDATE") {
      setSatellites(message.satellites);
      console.log("Satélites actualizados:", message.satellites.length);

      // Log de los tipos reales de satélites
      const types = message.satellites.map(sat => sat.type?.toLowerCase());
      console.log("Tipos recibidos:", Array.from(new Set(types)));
    }
  };

  useWebSocket(handleMessage);

  return <GlobeView satellites={satellites} />;
}

export default App;
