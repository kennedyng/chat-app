import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "src/api";

interface Props {
  children: React.ReactNode;
}

//connect to socket io
export const socket = io(API_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export type SocketContextType = {
  socket: Socket;
  activeUsers: {
    [key: string]: number;
  };
  message: {};
  getOnline: (userId: number) => void;
  getOffline: (userId: number) => void;
  joinChannel: (channelId: number) => void;
  leaveChannel: (channelId: number) => void;
  sendMessage: (data: any) => void;
};

const initialState = {
  socket,
  activeUsers: {},
  message: {},

  getOnline: (userId: number) => {
    socket.emit("USER_ONLINE", userId);
  },

  getOffline: (userId: number) => {
    socket.emit("USER_OFFLINE", userId);
  },

  joinChannel: (channelId: number) => {
    socket.emit("JOIN_CHANNEL", channelId);
  },

  leaveChannel: (channelId: number) => {
    socket.emit("LEAVE_CHANNEL", channelId);
  },

  sendMessage: (data: any) => {
    socket.emit("SEND_GROUP_MESSAGE", data);
  },
};
export const SocketContext = createContext<SocketContextType>(initialState);

const SocketProvider: React.FC<Props> = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState({});

  const [message, setMessage] = useState({});

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("ACTIVE_USERS", (users) => {
      setActiveUsers(users);
    });
  }, [socket, activeUsers]);

  useEffect(() => {
    socket.on("RECEIVE_GROUP_MESSAGE", (data) => {
      console.log("received Message", data);
      setMessage(data);
    });
  }, [socket, message]);

  return (
    <SocketContext.Provider
      value={{
        ...initialState,
        activeUsers,
        message,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
