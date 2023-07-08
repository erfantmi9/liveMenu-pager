import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleLogin = () => {
    // You can implement your login logic here.
    // For simplicity, let's just check if the username and password are not empty.
    // if (username !== "" && password !== "") {
    //   console.log("hi");
    //   // Navigate to the home screen or any other screen after successful login.
    //   navigation.navigate("MainScreen");
    // } else {
    //   // Display an error message or handle login failure.
    //   alert("Invalid credentials. Please try again.");
    // }

    navigation.navigate("MainScreen");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          justifyContent: "space-around",
          alignSelf: "center",
          fontSize: 20,
          fontWeight: "bold",
          margin: 5,
          color: "#000",
        }}
      >
        {t("welcome")}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
