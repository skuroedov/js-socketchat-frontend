import socketIOClient, { Socket } from "socket.io-client";
import { createContext } from "react";

const ENDPOINT = "http://192.168.1.38:3001";

export const socket = socketIOClient(ENDPOINT);
export const SocketContext = createContext<Socket>(socket);
