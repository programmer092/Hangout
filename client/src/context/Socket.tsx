import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UseAuthContext } from "./authUser";
import { io, Socket } from "socket.io-client";
import { baseURL } from "../assets/utils/baseURL";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  ID: (id: string) => void;
}

interface SocketContextProviderProps {
  children: ReactNode;
}
export const SocketContext = createContext<SocketContextType | null>(null);

export const UseSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("Error in SocketContext");
  }
  return context;
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = UseAuthContext();

  //sending the userid as query to
  //establishing the connection
  //listening the OnlineUsers event
  useEffect(() => {
    if (authUser) {
      const socket = io(`${baseURL}`, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("OnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      //   const Id = socket.emit("getSocketIdbyUserId", authUser._id);

      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  const ID = (id: string) => {
    if (socket) {
      socket.emit("getSocketIdByUserId", id, (socketId: string | null) => {
        if (socketId) {
          return socketId;
        } else {
          console.error("User is not online");
        }
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, ID }}>
      {children}
    </SocketContext.Provider>
  );
};
