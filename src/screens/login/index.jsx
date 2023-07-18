import React, {useContext, useState} from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";
import {useTranslation} from "react-i18next";
import {CText} from "../../components";
import {AuthContext} from "../../state/AuthContext";

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {t} = useTranslation();

    const handleLogin = async () => {
        try {
            login().then((res) => {
                if (res === "loggedIn") {
                    navigation.navigate("MainScreen");
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <View style={styles.container}>
            <CText
                style={{
                    justifyContent: "space-around",
                    alignSelf: "center",
                    fontSize: 20,
                    fontFamily: "iransansultrabold",
                    margin: 5,
                    color: "#000",
                }}
            >
                {t("welcome")}
            </CText>
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
            <Button title="Login" onPress={handleLogin}/>
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
