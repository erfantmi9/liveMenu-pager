import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/home";
import RequestsScreen from "../screens/requests";
import TablesScreen from "../screens/tables";
import { CText } from "../components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={t("home")}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 10,
          position: "absolute",
          bottom: 25,
          right: 20,
          left: 20,
          elevation: 0,
          backgroundColor: "#B7B8B5",
          margin: 20,
          display: "flex",
          alignItems: "center",
          height: 70,
          ...styles.tabBarShadows,
        },
      }}
    >
      <Tab.Screen
        name={t("requests")}
        component={RequestsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabsContainer}>
              <MaterialCommunityIcons
                name="reorder-horizontal"
                color={focused ? "#0D1B2A" : "#778DA9"}
                size={26}
              />
              <CText style={focused ? styles.focusedText : styles.tabsText}>
                {t("requests")}
              </CText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={t("home")}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.mainTabsContainer}>
              <MaterialCommunityIcons
                name="home"
                color={focused ? "#e0e1dd" : "#778DA9"}
                size={32}
              />
              <CText style={focused ? styles.mainFocusedText : styles.tabsText}>
                {t("home")}
              </CText>
            </View>
            // <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={t("aboutUs")}
        component={TablesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabsContainer}>
              <FontAwesome5
                name="info-circle"
                color={focused ? "#0D1B2A" : "#778DA9"}
                size={26}
              />
              <CText style={focused ? styles.focusedText : styles.tabsText}>
                {t("aboutUs")}
              </CText>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  tabBarShadows: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
  },
  tabsText: {
    fontSize: 15,
    fontFamily: "iransansultralight",
    color: "#778DA9",
  },
  focusedText: {
    fontSize: 15,
    fontFamily: "iransansultralight",
    color: "#3C3C3C",
  },
  mainFocusedText: {
    fontSize: 18,
    fontFamily: "iransansbold",
    color: "#e0e1dd",
  },
  mainTabsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 100,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#035D33",
  },
});
