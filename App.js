import "react-native-gesture-handler";
import React, { Component } from 'react';

import Navigation from "./src/navigation";
import "./src/utils/localization/i18n";
import { WebSocketProvider } from "./src/state/WebSocketContext";
import { I18nManager } from "react-native";
import { AuthProvider } from "./src/state/AuthContext";




export default function App() {
    React.useEffect(() => {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
    }, []);
  return (
    <AuthProvider>
      <WebSocketProvider>
        <Navigation />
      </WebSocketProvider>
    </AuthProvider>
  );
}
