import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/home";
import OrderScreen from "../screens/order";
import TablesScreen from "../screens/tables";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t("home")}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={t("orders")}
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="reorder-horizontal"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("tables")}
        component={TablesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="table-chair"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
