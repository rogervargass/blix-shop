import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Routes";
import { useBasketContext } from "../../common/contexts/Basket";
import OrderItem from "../../components/OrderItem";
import Separator from "../../components/Separator";
import FormCustomerInfo from "../../components/FormCustomerInfo";
import FormPaymentInfo from "../../components/FormPaymentInfo";
import { PaymentContext, PaymentSteps } from "../../common/contexts/Payment";
import { registerPayment } from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";

const SHIPPING_FEE_FIXED = 10;
const STATUS_SUCCEEDED = "succeeded";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "Checkout"> {}

export default function CheckoutScreen({ navigation }: Props) {
  const { basket, totalAmount } = useBasketContext();
  const { step, customerInfo, paymentInfo } = useContext(PaymentContext);

  useEffect(() => {}, [basket]);

  const onSubmitHandler = () => {
    const id_transaction = uuidv4();

    registerPayment(
      STATUS_SUCCEEDED,
      basket,
      { ...customerInfo},
      { ...paymentInfo },
      id_transaction
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={[styles.main, { flexDirection: "row" }]}>
        {step == PaymentSteps.CustomerInfo && <FormCustomerInfo />}
        {step == PaymentSteps.PaymentInfo && (
          <FormPaymentInfo onPress={onSubmitHandler} />
        )}
        <View style={styles.checkout}>
          <Text style={styles.title}>Order Summary</Text>
          <FlatList
            data={basket}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderItem
                title={item.title}
                description={item.description}
                price={item.price}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />
          <Separator />
          <View style={styles.ordersTotals}>
            <View style={styles.ordersValues}>
              <Text style={styles.orderProductDescription}>SUBTOTAL: </Text>
              <Text style={styles.orderProductDescription}>SHIPPING FEE: </Text>
              <Text style={styles.orderProductDescription}>TOTAL: </Text>
            </View>
            <View style={styles.ordersValues}>
              <Text style={styles.orderPrice}>{`$${totalAmount}`}</Text>
              <Text style={styles.orderPrice}>{`$${SHIPPING_FEE_FIXED}`}</Text>
              <Text style={styles.orderPrice}>{`$${
                totalAmount + SHIPPING_FEE_FIXED
              }`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
  checkout: {
    alignItems: "center",
    width: "40%",
    height: "100%",
    paddingHorizontal: 20,
    gap: 30,
  },
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
  ordersTotals: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 30,
  },
  ordersValues: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
  },
  fieldsContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 20,
  },
  fields: {
    width: "50%",
    gap: 25,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
