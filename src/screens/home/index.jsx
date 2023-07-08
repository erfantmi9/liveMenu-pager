import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
} from "react-native";

// import CustomCard from "../../components/common/card";
import { useTranslation } from "react-i18next";
import { WebSocketContext } from "../../services/WebSocketContext";

const HomeScreen = () => {
  const { messages, deleteMessage } = useContext(WebSocketContext);
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastMessage, setlastMessage] = useState();

  const screenWidth = Dimensions.get('window').width;
  const numColumns = Math.floor(screenWidth / 150);

  useEffect(() => {

    setlastMessage(messages[messages.length - 1]);

    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsBlinking(false);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [messages]);

  const { t } = useTranslation();
  const handleDelete = (index) => {
    deleteMessage(index);
  };



  const renderCard = ({ item, index }) => {
    return (

        <View style={styles.item}>
          {/* Render your item content */}
          <Text>{`${t("table")} ${JSON.parse(item)?.data?.tableid}`}</Text>
        </View>
      // <CustomCard
      //   title={`${t("table")} ${JSON.parse(item)?.data?.tableid}`}
      //   subtitle={JSON.parse(item)?.data?.msg}
      //   onPress={() => handleDelete(index)}
      //   style={[
      //     styles.card,
      //     isBlinking && index === messages.length - 1 ? styles.blink : null,
      //   ]}
      // />
    );
  };

  return (
    <View style={styles.container}>
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          renderItem={renderCard}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          columnWrapperStyle={{ marginBottom: 10 }}
          numColumns={numColumns}
        />
      ) : (
        <Text>{t("noAlert")}</Text>
      )}
    </View>
  );
};

export default HomeScreen;

const calculateItemWidth = () => {
  const screenWidth = Dimensions.get("window").width;
  const columnCount = 4;
  const margin = 25;
  const totalMarginWidth = (columnCount - 1) * margin;
  return (screenWidth - totalMarginWidth) / columnCount;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding:50
  },
  card: {
    width: "45.5%", // Adjust the card width based on the number of columns
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",

    borderRadius: 100,
  },
  item: {
    width: 150, // Adjust the item width as needed
    height: 150, // Adjust the item height as needed
    backgroundColor: 'gray',
    margin: 10,
    // Add additional styling as needed
  },
  blink: {
    backgroundColor: "yellow",
    animationDuration: "1s",
    animationName: "blink",
    animationIterationCount: "infinite",
  },
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});
