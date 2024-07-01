import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UseAuthContext } from "./authUser";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
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
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("OnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

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

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
