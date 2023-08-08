import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { globalStyle } from "../../assets/styles/global";
import { CText } from "../../components";
import { WebSocketContext } from "../../state/WebSocketContext";

export default function RequestsScreen() {
  const { allIncomingMessages } = useContext(WebSocketContext);
  const { t } = useTranslation();
  useEffect(() => {
    console.log("allIncomingMessages", allIncomingMessages.length);
  }, []);

  //renderItem for allIncomingMessages
  const requestItem = (item, index) => {
    const parseItem = JSON.parse(item.item);
    console.log(parseItem.data.tableid);
    return (
      <View>
        <View style={styles.tableNum}>
          <CText> {parseItem.data.tableid}</CText>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      <View style={styles.titleContainer}>
        <CText style={styles.title}>{t("requestsLists")}</CText>
        <CText style={styles.subtitle}>
          {t("requestCount")}
          {allIncomingMessages?.length}
        </CText>
      </View>

      <FlatList data={allIncomingMessages} renderItem={requestItem} style={styles.requestsList} />
    </View>
  );
}

const calculateItemWidth = () => {
  const screenWidth = Dimensions.get("window").width;
  const columnCount = 4;
  const margin = 60;
  const totalMarginWidth = (columnCount - 1) * margin;
  return (screenWidth - totalMarginWidth) / columnCount;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    fontFamily: "iransansbold",
  },
  titleContainer: {
    height: "auto",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "left",
    fontFamily: "iransanslight",
  },
  tableNum:{
    flex:1,
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#668f51',
    width:60,
    height:60,
    borderRadius:100,
    margin:8
  },
  requestsList:{
    paddingVertical:80
  }
});
