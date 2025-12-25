export const SocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Join User
    socket.on("join-chat", (user) => {
      socket.username = user;
      io.emit("join", user);
    }); 

    socket.on("send-message", (message) => {
      if (!socket.username) return;

      io.emit("new-message", {
        username: { username: "hii" },
        message: { message: "hello" },
        time: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
