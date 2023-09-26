import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductImage from "../../assets/vela_lavanda.jpg";

interface Props {
  title: string;
  description: string;
  price: number;
}

export default function OrderItem({ title, description, price }: Props) {
  return (
    <View style={styles.order}>
      <Image style={styles.orderImg} source={ProductImage} />
      <View style={styles.orderText}>
        <Text style={styles.orderProductTitle}>{title}</Text>
        <Text style={styles.orderProductDescription}>{description}</Text>
      </View>
      <Text style={styles.orderPrice}>${price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  order: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  orderImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: "contain",
  },
  orderText: {
    flex: 1,
  },
  orderProductTitle: {
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
  },
  orderProductDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#ffffff8d",
  },
  orderPrice: {
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
  },
});
