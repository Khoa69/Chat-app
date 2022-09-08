import { Socket } from "socket.io-client";

export interface SocketContextInterface {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

export interface IauthContext{
  user: any;
  loading:boolean,
  disabled:boolean;
  isAuth:boolean;
  error:string;
}