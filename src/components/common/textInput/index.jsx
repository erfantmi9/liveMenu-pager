import React, {useCallback, useState} from 'react';
import { TextInput, View, Text } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
const CustomTextInput = ({
                             label,
                             placeholder,
                             value,
                             onChangeText,
                             secureTextEntry,
                             keyboardType,
                             style,
                             containerStyle,
                             labelStyle,
                             textInputStyle,
                             errorMessage,
                             errorStyle,
                         }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [fontsLoaded] = useFonts({
        iransans: require("../../../assets/fonts/iran_sans_medium.ttf"),
        iransansbold: require("../../../assets/fonts/iran_sans_bold.ttf"),
        iransanslight: require("../../../assets/fonts/iran_sans_light.ttf"),
        iransansultralight: require("../../../assets/fonts/iran_sans_ultra_light.ttf"),
        iransansultrabold: require("../../../assets/fonts/iran_sans_ultra_bold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const handleOnFocus = () => {
        setIsFocused(true);
    };
    const handleOnBlur = () => {
        setIsFocused(false);
    };
    return (
        <View style={containerStyle}>
            {label && (
                <Text style={[{ color: isFocused ? 'black' : 'gray' }, labelStyle]}>
                    {label}
                </Text>
            )}
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                style={[{ borderBottomWidth: 1, borderColor: isFocused ? 'black' : 'gray' }, textInputStyle]}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
            {errorMessage && (
                <Text style={[{ color: 'red' }, errorStyle]}>{errorMessage}</Text>
            )}
        </View>
    );
};
export default CustomTextInput;
