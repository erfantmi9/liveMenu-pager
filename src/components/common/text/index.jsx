import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";



const CText = ({
  children,
  style,
  numberOfLines,
  onPress,
  selectable,
  ...otherProps
}) => {
  const [fontsLoaded] = useFonts({
    "iransans": require("../../../assets/fonts/iran_sans_medium.ttf"),
    "iransansbold": require("../../../assets/fonts/iran_sans_bold.ttf"),
    "iransanslight": require("../../../assets/fonts/iran_sans_light.ttf"),
    "iransansultrabold": require("../../../assets/fonts/iran_sans_ultra_bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView}>
      <Text
        style={[styles.text, style]}
        numberOfLines={numberOfLines}
        onPress={onPress}
        selectable={selectable}
        {...otherProps}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "iransans",
    fontSize: 16,
    color: "black",
  },
});

export default CText;
