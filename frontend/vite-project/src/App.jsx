import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Listen for events
  useEffect(() => {
    socket.on("new-message", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log(data);
    });

    socket.on("user-joined", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user-left", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  // Join chat
  const joinChat = () => {
    if (!username) return;
    socket.connect();
    socket.emit("join-chat", { username });
    setJoined(true);
  };

  // Send message
  const sendMessage = () => {
    if (!text) return;
    socket.emit("send-message", { message: text });
    setText("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {!joined ? (
        <div>
          <h2>Enter your name to join the chat</h2>
          <input
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button onClick={joinChat} style={{ padding: "0.5rem 1rem" }}>
            Join
          </button>
        </div>
      ) : (
        <div>
          <h2>Live Chat</h2>
          <div
            style={{
              border: "1px solid #ccc",
              height: "300px",
              overflowY: "scroll",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            {messages.map((m, i) => (
              <p key={i} style={{ margin: "0.2rem 0" }}>
                {m.username?.username && (
                  <strong>{m.username.username}: </strong>
                )}
                {m.message?.message}
              </p>
            ))}
          </div>

          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ padding: "0.5rem", width: "70%", marginRight: "0.5rem" }}
          />
          <button onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
