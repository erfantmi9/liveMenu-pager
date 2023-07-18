import React, {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {WebSocketContext} from "../../state/WebSocketContext";
import {CText, CustomCard} from "../../components";
import {AuthContext} from "../../state/AuthContext";

const HomeScreen = () => {
  const {message, deleteMessage} = useContext(WebSocketContext);
  const [last3notifications, setLast3notifications] = useState([]);
  const [listItemsRefresh, setListItemsRefresh] = useState(false);
  const {tables} = useContext(AuthContext);
  const {t} = useTranslation();


  useEffect(() => {
    if (message != null) {
      const tableData = JSON.parse(message)
      if (!isObjectSameAsArray(message, last3notifications)) {
        last3notifications.push(JSON.parse(message));
      }
      tables.forEach((t) => {

        if (t.Id === JSON.parse(tableData?.data?.tableid)) {
          t.hasAlert = true;
          if (tableData?.data?.msg.length > 0  ){
            t.alertMessage =  tableData?.data?.msg
          }
        }
      });
      setListItemsRefresh(!listItemsRefresh);


    }
  }, [message, tables]);

  const handleDelete = (index) => {
    deleteMessage(index);
  };

  const isObjectSameAsArray = (obj, arr) => {
    // Find the first object in the array that matches the input object
    const foundObject = arr.find((item) => {
      // Check if all key-value pairs in the object are the same
      return Object.keys(item).every((key) => obj[key] === item[key]);
    });

    return !!foundObject;
  };

  //tables flatlist renderItem
  const renderCard = ({item, index}) => {
    return (
        <CustomCard
            title={item?.Id}
            subtitle={item?.alertMessage}
            onPress={() => handleDelete(index)}
            style={[styles.item, item.hasAlert ? styles.blink : null]}
        />
    );
  };
  //notifications flatlist renderItem
  const renderNotif = ({item, index}) => {
    const notif = item.data
    console.log('item',item)

    return (
       <View style={styles.notifSection}>
         <FontAwesome5
             name="concierge-bell"
             color={"red"}
             size={35}
             style={{marginRight:10}}
         />

         <CText style={styles.notifText}> | {notif?.tableid} </CText>
         <CText style={styles.notifSub}>  میز شماره {notif?.tableid} منتظر شماست   </CText>
       </View>
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <CText style={styles.title}>{t("tables")}</CText>
          <CText style={styles.subtitle}>
            {t("tableCount")}
            {tables?.length}
          </CText>
        </View>

        {last3notifications.length > 0 ? (
            <View style={styles.notifContainer}>
              <FlatList
                  data={last3notifications.slice(-3)}
                  renderItem={renderNotif}
                  keyExtractor={(item, index) => index}
                  extraData={listItemsRefresh}
              />

            </View>
        ) : (
            <CText>{t("noAlert")}</CText>
        )}

        <View style={styles.tablesContainer}>
          {tables?.length > 0 ? (
              <FlatList
                  data={tables}
                  renderItem={renderCard}
                  keyExtractor={(item, index) => index}
                  columnWrapperStyle={{marginBottom: 10}}
                  numColumns={4}
                  columnWidth={calculateItemWidth()}
                  extraData={listItemsRefresh}
              />
          ) : (
              <CText>{t("noAlert")}</CText>
          )}
        </View>
      </View>
  );
};

export default HomeScreen;

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
    padding: 50,
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    fontFamily: "iransansbold",
  },
  titleContainer: {
    height: "auto",
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
  tablesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notifContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8b8b8',
    minHeight: 50,
    minWidth: '60%',
    borderRadius: 10,
    margin:20

  },
  notifSection:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center"

  },
  notifText:{
    fontFamily:'iransansbold',
    fontSize:30,
    marginRight:10
  },
  notifSub:{
    fontFamily:'iransans',
    fontSize:25,
    marginRight:10
  },
  card: {
    width: "45.5%", // Adjust the card width based on the number of columns
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 100,
  },
  item: {
    width: calculateItemWidth(), // Calculate the width dynamically
    height: calculateItemWidth(), // Set the desired height for your item
    backgroundColor: "#fff",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  blink: {
    backgroundColor:'#dfe5ff',
    animationDuration: "1s",
    animationName: "blink",
    animationIterationCount: "infinite",
    borderColor:'#0364a1',
    borderWidth:8,
    borderStyle:'dashed'
  },
  "@keyframes blink": {
    "0%": {opacity: 1},
    "50%": {opacity: 0},
    "100%": {opacity: 1},
  },
});
