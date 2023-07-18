import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CText } from "../../index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

const CustomCard = ({ title, subtitle, imageSource, onPress, ...props }) => {
    return (
        <TouchableOpacity
            style={[styles.cardContainer, props.style]}
            onPress={onPress}
        >
            {imageSource != null && (
                <Image source={imageSource} style={styles.image} />
            )}

            <View style={styles.textContainer}>
                <CText style={styles.title}>{title}</CText>
            </View>

            {/* Icon */}
            {subtitle != null && (
                <AntDesign
                    style={styles.msgIcon}
                    name="message1"
                    color={"black"}
                    size={40}
                />




            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8f8f8f",
        position: "relative",
    },
    msgIcon: {
        position: "absolute",
        top: 10, // Adjust the top value to position the icon at the desired vertical position
        left: 10,
    },
    image: {
        width: 200,
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    textContainer: {
        padding: 10,
        width: "auto",
        height: "auto",
    },
    title: {
        fontSize: 45,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#fefefe",
    },
});

export default CustomCard;
