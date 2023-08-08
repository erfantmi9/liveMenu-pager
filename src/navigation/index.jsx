import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "../screens/login";
import { AuthContext } from "../state/AuthContext";
import { f_getDataFromStorage } from "../services/public";

const Stack = createStackNavigator();

const Navigation = () => {
  const { login, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkSavedLoginInfo = async () => {
      try {
        const userData = await f_getDataFromStorage("userData");
        console.log(
          "token",
          userData?.token,
          userData?.username,
          userData?.password
        );
        if (userData?.token) {
          // If login information is found, navigate to the main screen automatically.
          await login(userData?.username, userData?.password, true);
        }
      } catch (error) {
        console.error("Error reading login information:", error);
      }
    };

    checkSavedLoginInfo();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainScreen" component={BottomTabNavigation} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
