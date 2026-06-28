import { Server } from "socket.io";

let io: Server;

export function getIO() {
  return io;
}

export function initIO(server: any) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("接続:", socket.id);

    socket.on("join", (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on("disconnect", () => {
      console.log("切断:", socket.id);
    });
  });

  return io;
}