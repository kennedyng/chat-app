import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "src/api";

interface Props {
  children: React.ReactNode;
}

//connect to socket io
export const socket = io(API_URL);
export const SocketContext = createContext<Socket>(socket);

const SocketProvider: React.FC<Props> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
