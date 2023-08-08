import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as Notifications from "expo-notifications";
import * as Haptics from "expo-haptics";
import { f_getDataFromStorage, f_setDataToStorage } from "../services/public";
import moment from "jalali-moment";

export const WebSocketContext = createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState();
  const [allIncomingMessages, setAllIncomingMessages] = useState([]);
  const [isWSConnected, setIsWSConnected] = useState(false);
  const { user } = useContext(AuthContext);
  const currentDate = moment().locale("fa");
  useEffect(() => {
    if (user) {
      connectWebsocket();
    }
    storeMessagesInStorage(allIncomingMessages);
  }, [user, allIncomingMessages]);

  const connectWebsocket = () => {
    const ws = new WebSocket(`ws://socket.live-menu.ir?ogid=${user?.gId}`);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      checkWebSocketConnection(ws);
    };

    ws.onmessage = async (event) => {
      const message = event.data;
      setMessage(message);
      setAllIncomingMessages((prevMessages) => [...prevMessages, message]); // Add the new message to the messages array

      await handleVibration();
      await sendNotification(JSON.parse(message));

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

  const checkWebSocketConnection = (webSocket) => {
    const checkConnection = () => {
      if (webSocket.readyState === webSocket.OPEN) {
        console.log("WebSocket is connected");
        setIsWSConnected(true);
      } else {
        setIsWSConnected(false);
        console.log("WebSocket is not connected");
      }
    };

    // Check the WebSocket connection initially
    checkConnection();

    // Set an interval to check the WebSocket connection every 1 minute
    const intervalId = setInterval(checkConnection, 60000);

    // Return a function to clear the interval when it's no longer needed
    return () => {
      clearInterval(intervalId);
    };
  };

  const sendNotification = async (message) => {
    console.log("message", message?.data?.msg);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `میز شماره ${message.data.tableid} منتظره`,
        body: message?.data?.msg.length > 0 ? message?.data?.msg : "",
      },
      trigger: { seconds: 2 },
    });
  };

  const handleVibration = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  // Function to store messages in AsyncStorage
  const storeMessagesInStorage = async (all) => {
    // const updatedData = all.map((item) => ({
    //   ...item,
    //   date: currentDate.format("jYYYY/jM/jD"),
    //   time: currentDate.format("HH:mm:ss"),
    // }));
    try {
      await f_setDataToStorage("websocketMessages", all);
    } catch (error) {
      console.log("Error storing messages:", error);
    }
  };

  // Function to retrieve messages from AsyncStorage (called on app startup)
  const retrieveMessagesFromStorage = async () => {
    try {
      const storedMessages = await f_getDataFromStorage("websocketMessages");
      if (storedMessages) {
        setAllIncomingMessages(storedMessages);
      }
    } catch (error) {
      console.log("Error retrieving messages:", error);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        message,
        isWSConnected,
        retrieveMessagesFromStorage,
          allIncomingMessages,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
