import socketIOClient, { Socket } from "socket.io-client";
import { createContext } from "react";

const ENDPOINT = process.env.ENDPOINT as string;

export const socket = socketIOClient(ENDPOINT);
export const SocketContext = createContext<Socket>(socket);
