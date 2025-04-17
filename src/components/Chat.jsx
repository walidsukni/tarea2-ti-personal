import { useState, useEffect, useRef } from "react";
import "./Chat.css";

const Chat = ({ ws, messages }) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (ws?.readyState === WebSocket.OPEN && input.trim() !== "") {
      ws.send(JSON.stringify({ type: "COMM", message: input }));
      setInput("");
    }
  };

  // Auto scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-log">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.level === "warn" ? "warn" : ""}`}
          >
            <strong>{msg.station_id || msg.satellite_id}</strong> [{msg.date}]:{" "}
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
