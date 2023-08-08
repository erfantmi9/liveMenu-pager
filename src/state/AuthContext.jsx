import React, { createContext, useState } from "react";
import axios from "axios";

import {f_getDataFromStorage, f_removeFromStorage, f_setDataToStorage} from "../services/public";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tables, setTables] = useState([]);

  const login = async (username, password, rememberMe = false) => {
    console.log(username, password, rememberMe);
    const loginRes = await axios
      .get(
        `https://portal.live-menu.ir/api/Users/Login?User=${username}&Pass=${password}&IP=0`
      )
      .then(async (res) => {
        try {
          if (rememberMe) {
            await f_setDataToStorage("userData",{username:username,password:password,token:res?.data[0]?.Token});
          }
          const url = res?.data[0]?.appUrl;
          const formattedURL = url.replace(/^(?:https?:\/\/)?(?:www\.)?/, "");

          // Perform the login request using Axios
          const response = await axios.post(
            "https://apit.live-menu.ir/api/Menu/Config3",
            {
              url: formattedURL,
              cuGid: null,
              language: "fa",
              oGid: null,
              food: false,
              ccscore: false,
              favorite: false,
              popular: false,
              home: false,
            }
          );

          await setUser(response?.data?.config[0]);
          await setTables(JSON.parse(response?.data?.config[0].Tables));
          const tables = response?.data?.config[0].Tables;
          await f_setDataToStorage("tables", tables);
          await f_setDataToStorage("oGid", response?.data?.config[0]?.gId);
          if (response != null) {
            return { data: response };
          }
        } catch (error) {
          // Handle the error, e.g., display an error message
          console.error("Login failed:", error);
        }
      });
    if (loginRes != null) {
      setIsLoggedIn(true)
      return { isLoggedIn: isLoggedIn, data: loginRes };
    }
    // Save the user data in the context
  };

  const logout = async () => {
    // Clear the user data from the context
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    setUser(null);
    setIsLoggedIn(false)
  };


  return (
    <AuthContext.Provider value={{ user, tables, setTables, login, logout,isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
