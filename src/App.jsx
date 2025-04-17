import { useState } from "react";
import GlobeView from "./components/GlobeView";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);

  const handleMessage = (message) => {
    if (message.type === "SATELLITES") {
      setSatellites(message.satellites);
    }

    // Puedes ir agregando más eventos aquí...
  };

  useWebSocket(handleMessage);

  return <GlobeView satellites={satellites} />;
}

export default App;
