import { useCallback, useState } from "react";
import GlobeView from "./components/GlobeView";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);

  const handleMessage = useCallback((message) => {
    console.log("Mensaje recibido:", message);

    if (message.type === "POSITION_UPDATE") {
      setSatellites(message.satellites);
      console.log("Satélites actualizados:", message.satellites.length);
    }
  }, []);

  useWebSocket(handleMessage);

  return <GlobeView satellites={satellites} />;
}

export default App;
