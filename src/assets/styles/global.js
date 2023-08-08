import {StyleSheet} from "react-native";

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        backgroundColor: "#e0e1dd",

    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    flexCenterRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    flexBetween:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width:'100%',

        flexDirection: "row",
    },

    flexStart: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
