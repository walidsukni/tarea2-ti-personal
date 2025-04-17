import { useState } from "react";

const Chat = ({ ws }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "COMM",
        message,
      }));
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "10px", backgroundColor: "#282c34", color: "white", height: "300px", overflow: "auto" }}>
      <div>
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensaje a enviar"
          style={{ width: "80%", padding: "8px" }}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
