import React, {useState} from "react";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {BlurView} from "expo-blur";
import AntDesign from "react-native-vector-icons/AntDesign";

import CText from "../text/index";

const CustomCard = ({
                        title,
                        subtitle,
                        imageSource,
                        onPress,
                        onMessagePress,
                        ...props
                    }) => {
    const [modalVisible, setModalVisible] = useState(false);

    onMessagePress = () => {
        setModalVisible(true);
    };
    return (
        <View>
            <TouchableOpacity
                style={[styles.cardContainer, props.style]}
                onPress={subtitle != null ?onMessagePress : onPress}
            >
                {/*subtitle != null ? onMessagePress :*/}
                {imageSource != null && (
                    <Image source={imageSource} style={styles.image}/>
                )}

                <View style={styles.textContainer}>
                    <CText style={styles.title}>{title}</CText>
                </View>

                {subtitle != null && (
                    <AntDesign
                        style={styles.msgIcon}
                        name="message1"
                        color={"white"}
                        size={40}
                    />
                )}
            </TouchableOpacity>
            <Modal
                style={styles.modalContainer}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CText>{subtitle}</CText>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                onPress();
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <CText style={styles.textStyle}>پیگیری شد</CText>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8f8f8f",
        position: "relative",
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
        color:'white'
    },
    subtitle: {
        fontSize: 14,
        color: "#fefefe",
    },

    // modal view
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#606070',
        margin: 150,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minHeight: 300,
        minWidth: 300
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 121
    },

    buttonClose: {
        backgroundColor: '#035D33',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default CustomCard;
