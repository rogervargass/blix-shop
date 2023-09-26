import { FlatList, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Routes";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { useBasketContext } from "../../common/contexts/Basket";
import { Product } from "../../types/Product";
import MOCK_PRODUCTS from "./products.json";
import { useContext } from "react";
import { UserContext } from "../../common/contexts/User";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

export default function HomeScreen({ navigation }: Props) {
  const { addProduct } = useBasketContext();
  const { name } = useContext(UserContext);

  function goToRegisterScreen() {
    navigation.navigate("Register");
  }

  function handleBuyProduct(product: Product) {
    addProduct(product);
    const isLogged = !!name

    if(isLogged) {
      navigation.navigate("Checkout");
    } else {
      navigation.navigate("Register");
    }
  }

  return (
    <View style={styles.container}>
      <Header
        onPressRegister={goToRegisterScreen}
        onPressLogin={goToRegisterScreen}
      />
      <Text style={styles.title}>Blix Shop</Text>
      <Text style={styles.subtitle}>Discover</Text>
      <FlatList
        data={MOCK_PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            onPressBuy={() => handleBuyProduct(item)}
            title={item.title}
            description={item.description}
            price={item.price}
            rating={item.rating}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 60,
    textAlign: "center",
    color: "#FFF",
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 30,
    marginVertical: 15,
    color: "#FFF",
  },
});
