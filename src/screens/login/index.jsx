import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {useTranslation} from "react-i18next";
import {CText} from "../../components";
import {AuthContext} from "../../state/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {
    const {login,isLoggedIn} = useContext(AuthContext);

    const [username, setUsername] = useState('pwatest');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false); // State to manage loading
    const [rememberMe, setRememberMe] = useState(false); // State to handle Remember Me checkbox
    const {t} = useTranslation();

    // useEffect(() => {
    //     const checkSavedLoginInfo = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem("token");
    //             const user = await AsyncStorage.getItem("username");
    //             const pass = await AsyncStorage.getItem("password");
    //             if (token) {
    //                 // If login information is found, navigate to the main screen automatically.
    //                 const res = await login( JSON.parse(user) , JSON.parse(pass) , rememberMe);
    //                 if (res.status === "loggedIn") {
    //                     navigation.navigate("MainScreen");
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Error reading login information:", error);
    //         }
    //     };
    //
    //     checkSavedLoginInfo();
    // }, [navigation]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await login(username, password, rememberMe);
            if (isLoggedIn) {
                navigation.navigate("MainScreen");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false); // Set loading to false when login is completed (success or error)
        }
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require("../../assets/images/backgroundLogin.jpg")}
            blurRadius={4}
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <CText style={styles.text}>{t("welcome")}</CText>
                    <TextInput
                        style={styles.input}
                        placeholder={t("userName")}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={t("password")}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.rememberMeContainer}
                        onPress={() => setRememberMe((prevValue) => !prevValue)}
                    >
                        <View style={styles.checkbox}>
                            {rememberMe && <View style={styles.checked}/>}
                        </View>
                        <CText style={styles.rememberMeText}>{t("rememberMe")}</CText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} disabled={loading} onPress={handleLogin}>
                        {loading ? (
                            <ActivityIndicator size="large" color="white"/>
                        ) : (
                            <CText style={styles.buttonText}>{t("login")}</CText>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
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
        width: "70%",
        height: 40,
        borderColor: "white",
        color: 'white',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        textAlign: "center",
        borderRadius: 8,

    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    formContainer: {
        width: 500,
        height: 600,
        backgroundColor: '#06B865',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        elevation: 5, // Add the elevation for the shadow effect


    },
    text: {
        justifyContent: "space-around",
        alignSelf: "center",
        fontSize: 20,
        fontFamily: "iransansultrabold",
        color: 'white',
        margin: 50,
    },
    button: {
        backgroundColor: '#035D33', // Change the color to your desired background color
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%'
    },
    buttonText: {
        color: '#fff', // Change the color to your desired text color
        fontSize: 18,
    },
    rememberMeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#000",
    },
    rememberMeText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#fff",
    },
});

export default LoginScreen;
