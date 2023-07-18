import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      connectWebsocket();
    }
  }, [user]);

  const connectWebsocket = () => {
    const ws = new WebSocket(
      `ws://socket.live-menu.ir?ogid=${user?.gId}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setMessage(message);
      console.log("Received message:", message);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setTimeout(() => {
        connectWebsocket();
      }, 2000);
    };

    return () => {
      ws.close(); // Close the WebSocket connection when the component unmounts
    };
  };

  const deleteMessage = (index) => {
    setMessage((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages.splice(index, 1);
      return updatedMessages;
    });
  };

  return (
    <WebSocketContext.Provider value={{ message, deleteMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
