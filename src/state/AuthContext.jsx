import React, { createContext, useState } from "react";
import axios from "axios";

import { f_setDataToStorage } from "../services/public";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
    const [tables, setTables] = useState();

    const login = async (username, password) => {
    try {
      // Perform the login request using Axios
      const response = await axios.post(
        "https://apit.live-menu.ir/api/Menu/Config3",
        {
          url: "pwatest.live-menu.ir",
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
      await setTables(JSON.parse( response?.data?.config[0].Tables));

      const tables = response?.data?.config[0].Tables;
      await f_setDataToStorage("tables", tables);
      await f_setDataToStorage("oGid", response?.data?.config[0]?.gId);
      if (response != null) {
        return "loggedIn";
      }

      // Save the user data in the context
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    // Clear the user data from the context
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,tables, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
