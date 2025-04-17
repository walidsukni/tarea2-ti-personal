import GlobeView from "./components/GlobeView";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const handleMessage = (message) => {
    console.log("Mensaje recibido:", message);
  };

  useWebSocket(handleMessage);

  return <GlobeView />;
}

export default App;
