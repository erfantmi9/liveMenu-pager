import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomCard from "../../components/common/card";
import { useTranslation } from "react-i18next";

const TablesScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CustomCard
        title={t("fullTables")}
        subtitle={"میز هایی ک پر هستند و قابلیت رزرو ندارد"}
        imageSource={require("../../assets/images/tables.png")}
      />
      <CustomCard
        title={t("fullTables")}
        subtitle={"میز هایی ک پر هستند و قابلیت رزرو ندارد"}
        imageSource={require("../../assets/images/tables.png")}
      />
    </View>
  );
};

export default TablesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 30,
    flex: 1,
  },
  card: {
    width: "100%",
    padding: 10,
  },
});
