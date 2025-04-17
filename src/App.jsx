import { useState, useRef } from "react";
import GlobeView from "./components/GlobeView";
import Chat from "./components/Chat";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const [satellites, setSatellites] = useState([]);
  const ws = useRef(null);

  const handleMessage = (message) => {
    if (message.type === "SATELLITE-STATUS") {
      setSatellites(prev => {
        const updatedSatellites = prev.filter(sat => sat.satellite_id !== message.satellite.satellite_id);
        return [...updatedSatellites, message.satellite];
      });
    }

    if (message.type === "SATELLITES") {
      setSatellites(message.satellites);
    }
  };

  ws.current = useWebSocket(handleMessage);

  return (
    <>
      <GlobeView satellites={satellites} />
      <Chat ws={ws.current} />
    </>
  );
}

export default App;
