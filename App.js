import "react-native-gesture-handler";

import Navigation from "./src/navigation";
import "./src/utils/localization/i18n";
import { WebSocketProvider } from "./src/services/WebSocketContext";
import { I18nManager } from "react-native";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  return (
    <WebSocketProvider>
      <Navigation />
    </WebSocketProvider>
  );
}
