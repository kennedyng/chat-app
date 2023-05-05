import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "src/api";

interface Props {
  children: React.ReactNode;
}

//connect to socket io
export const socket = io(API_URL, {
  transports: ["websocket"],
});

export type SocketContextType = {
  socket: Socket;
  activeUsers: {};
  getOnline: (userId: number) => void;
};

const initialState = {
  socket,
  activeUsers: {},

  getOnline: (userId: number) => {
    socket.emit("USER_ONLINE", userId);
  },
};
export const SocketContext = createContext<SocketContextType>(initialState);

const SocketProvider: React.FC<Props> = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState({});

  useEffect(() => {
    socket.on("ACTIVE_USERS", (users) => {
      setActiveUsers(users);
    });
  }, [setActiveUsers, socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        activeUsers,
        getOnline: initialState.getOnline,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
