import { Server, Socket } from "socket.io";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<string, { name: string }> = {};

let users:any = [];

const addUser = (userId:string, socketId:string) => {
  !users.some((user:any) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId:string) => {
  users = users.filter((user:any) => user.socketId !== socketId);
};

const getUser = (userId:string) => {
  return users.find((user:any) => user.userId === userId);
};

function socket({ io }: { io: Server }) {
  console.log(`Sockets enabled`);
  io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    if(userId){
      addUser(userId, socket.id);
       io.emit("getUsers", users);
    }
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      content,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
}

export default socket;