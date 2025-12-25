import { addMessageJob } from "./queue/producer.js";

export const SocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Join User
    socket.on("join-chat", (user) => {
      socket.username = user;
      io.emit("join", user);
    });

    // Send Realtime Chat "Avoid race condition"
    socket.on("send-message", (message) => {
      if (!socket.username) return;

      const payload = {
        username: socket.username,
        message,
        timestamp: Date.now(),
      };
      // Broadcast message immediatly so user will not have to wait "Improve UX"
      io.emit("new-message", payload);

      // Add message to queue for time aksing tasks like DB store
      addMessageJob(payload);
      console.log("Message sent:", payload);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
