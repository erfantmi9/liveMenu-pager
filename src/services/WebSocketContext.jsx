import React, { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectWebsocket();
  }, []);

  const connectWebsocket = () => {
    const ws = new WebSocket(
      "ws://socket.live-menu.ir?ogid=34096430-A51E-4C78-92E5D9D08CADE8CD"
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("Received message:", message);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setTimeout(() => {
        connectWebsocket();
      }, 5000);
    };

    return () => {
      ws.close(); // Close the WebSocket connection when the component unmounts
    };
  };

  const deleteMessage = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages.splice(index, 1);
      return updatedMessages;
    });
  };

  return (
    <WebSocketContext.Provider value={{ messages, deleteMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
