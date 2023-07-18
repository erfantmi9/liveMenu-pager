import "react-native-gesture-handler";

import Navigation from "./src/navigation";
import "./src/utils/localization/i18n";
import { WebSocketProvider } from "./src/state/WebSocketContext";
import { I18nManager } from "react-native";
import { AuthProvider } from "./src/state/AuthContext";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <Navigation />
      </WebSocketProvider>
    </AuthProvider>
  );
}
