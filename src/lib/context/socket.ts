import socketIOClient, { Socket } from "socket.io-client";
import { createContext } from "react";

const ENDPOINT = "http://127.0.0.1:3001";

export const socket = socketIOClient(ENDPOINT);
export const SocketContext = createContext<Socket>(socket);
