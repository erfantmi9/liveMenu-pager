import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8f8f8f",
  },
  image: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#fefefe",
  },
});

export default CustomCard;
