import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ControlledTextInput from "../ControlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PaymentContext, PaymentSteps } from "../../common/contexts/Payment";
import Button from "../Button";

const schema = yup.object().shape({
  fullName: yup.string().required("full name is required"),
  email: yup.string().email().required("email is required"),
  document: yup.string().required("document is required"),
  phone: yup.string().required("phone is required"),
});

type FormData = {
  fullName: string;
  email: string;
  document: string;
  phone: string;
};

export default function FormCustomerInfo() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      document: "",
      phone: "",
    },
  });

  const { setCustomerInfo, setStep } = useContext(PaymentContext);

  const onSubmitHandler = (formData: FormData) => {
    const { fullName, email, document, phone } = formData;
    setCustomerInfo({
      fullName,
      email,
      document,
      phone,
    });
    setStep(PaymentSteps.PaymentInfo)
    reset();
  };

  return (
    <View style={styles.fieldsContainer}>
      <Text style={styles.title}>Customer Info</Text>
      <View style={styles.fields}>
        <ControlledTextInput
          name="fullName"
          control={control}
          label="Full Name"
          placeholder="Full Name"
          error={errors.fullName?.message}
        />

        <ControlledTextInput
          name="email"
          control={control}
          label="Email"
          placeholder="example@example.com"
          error={errors.email?.message}
        />

        <ControlledTextInput
          name="document"
          control={control}
          label="Document"
          placeholder="12345678901"
          error={errors.document?.message}
        />
        <ControlledTextInput
          name="phone"
          control={control}
          label="Phone"
          placeholder="12 345678901"
          inputMode="tel"
          error={errors.phone?.message}
        />
      </View>
      <Button title={`Go to Payment Info`} onPress={handleSubmit(onSubmitHandler)} />
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
});
