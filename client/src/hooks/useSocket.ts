import React, { useContext } from "react";
import { SocketContext } from "src/context/socket";

const useSocket = () => useContext(SocketContext);

export default useSocket;
