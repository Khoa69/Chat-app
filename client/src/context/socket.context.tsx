import React ,{ createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import config from "../config/default";
import EVENTS from "../config/events";
import { SocketContextInterface } from "../types";
const socket = io(config.socket_url);

const SocketContext = createContext<SocketContextInterface>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
    localStorage.setItem("username", "");
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value:any) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value:any) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }:any) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages((messages:any) => [...messages, { message, username, time }]);
    });
  }, [socket]);

  
  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
      />
  );
}

export const useSockets = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error(
      `You must call useSockets() inside of a <AuthenticationContextProvider />`
    );
  }
  return socket;
};

export default SocketsProvider;