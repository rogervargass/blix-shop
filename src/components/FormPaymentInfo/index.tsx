import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ControlledTextInput from "../ControlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PaymentContext } from "../../common/contexts/Payment";
import Button from "../Button";

const CURRENT_YEAR = new Date().getFullYear();

const schema = yup.object().shape({
  cardholderName: yup.string().required("Cardholder's name is required"),
  cardNumber: yup.string().min(12).max(12).required("Card number is required"),
  expirationDateMonth: yup
    .number()
    .min(1)
    .max(12)
    .required("document is required"),
  expirationDateYear: yup
    .number()
    .min(CURRENT_YEAR)
    .max(2100)
    .required("phone is required"),
  cardSecurityCode: yup.string().min(3).max(3).required("CVC/CVV is required"),
});

type FormData = {
  cardholderName: string;
  cardNumber: string;
  expirationDateMonth: number;
  expirationDateYear: number;
  cardSecurityCode: string;
};

interface Props {
  onPress: () => void;
}

export default function FormPaymentInfo({ onPress }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expirationDateMonth: undefined,
      expirationDateYear: undefined,
      cardSecurityCode: "",
    },
  });
  const { setPaymentInfo } = useContext(PaymentContext);

  const onSubmitHandler = (formData: FormData) => {
    const {
      cardholderName,
      cardNumber,
      expirationDateMonth,
      expirationDateYear,
      cardSecurityCode,
    } = formData;
    setPaymentInfo({
      cardholderName,
      cardNumber,
      expirationDateMonth,
      expirationDateYear,
      cardSecurityCode,
    });
    onPress()
    reset();
  };

  return (
    <View style={styles.fieldsContainer}>
      <Text style={styles.title}>Payment Info</Text>
      <View style={styles.fields}>
        <ControlledTextInput
          name="cardholderName"
          control={control}
          label="Cardholder's Name"
          placeholder="Cardholder Name"
          inputMode="text"
          error={errors.cardholderName?.message}
        />

        <ControlledTextInput
          name="cardNumber"
          control={control}
          label="Card Number"
          placeholder="4343 6789 3323 5556"
          inputMode="numeric"
          error={errors.cardNumber?.message}
        />
        <View style={styles.fieldsCardDates}>
          <ControlledTextInput
            name="expirationDateMonth"
            control={control}
            label="Expiration Date (Month)"
            placeholder="06"
            inputMode="numeric"
            error={errors.expirationDateMonth?.message}
          />
          <ControlledTextInput
            name="expirationDateYear"
            control={control}
            label="Expiration Date (Year)"
            placeholder="2035"
            inputMode="numeric"
            error={errors.expirationDateYear?.message}
          />
        </View>
        <View style={styles.fieldCardCode}>
          <ControlledTextInput
            name="cardSecurityCode"
            control={control}
            label="CVV/CVC"
            placeholder="256"
            inputMode="numeric"
            error={errors.cardSecurityCode?.message}
          />
        </View>
      </View>
      <Button
        title={`Pay Purchase`}
        onPress={handleSubmit(onSubmitHandler)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
  },
  fieldsContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 20,
  },
  fields: {
    width: "50%",
    gap: 25,
  },
  fieldsCardDates: {
    flexDirection: "row",
    maxWidth: "45%",
    gap: 10,
  },
  fieldCardCode: {
    maxWidth: "30%",
  },
});
