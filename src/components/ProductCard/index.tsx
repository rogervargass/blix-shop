import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Button";
import ProductImage from '../../assets/vela_lavanda.jpg';
import { Product } from "../../types/Product";

interface Props {
  title: string;
  description: string;
  price: number;
  rating: number;
  onPressBuy: () => void;
}

export default function ProductCard({title, description, price, rating, onPressBuy}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={ProductImage}
          alt="Imagem de uma vela de lavanda"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.mainText}>{title}</Text>
        <Text style={styles.mainText}>{rating}</Text>
        <Text style={styles.description}>
          {description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.mainText}>{`$ ${price}`}</Text>
          <Button title="Buy" onPress={onPressBuy} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 450,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    gap: 20
  },
  mainText: {
    fontFamily: 'Poppins_500Medium',
  },
  imageContainer: {
    height: "100%",
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
    resizeMode: "contain"
  },
  infoContainer: {
    width: '55%',
    gap: 10
  },
  description: {
    flexWrap: "wrap",
    fontFamily: 'Poppins_400Regular',
    fontSize: 11
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});
