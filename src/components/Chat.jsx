import { useState, useEffect, useRef } from "react";
import "./Chat.css";

const Chat = ({ ws, messages, setMessages }) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (ws?.readyState === WebSocket.OPEN && input.trim() !== "") {
      const message = {
        station_id: "YOU",
        content: input,
        level: "info",
        date: new Date().toLocaleString()
      };

      ws.send(JSON.stringify({ type: "COMM", message: input }));
      setMessages((prev) => [...prev, message]);
      setInput("");
    }
  };

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
            <strong>{msg.station_id || msg.satellite_id || "??"}</strong>
            {" [" + (msg.date || "sin fecha") + "]: "}
            {msg.content || JSON.stringify(msg)}
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
