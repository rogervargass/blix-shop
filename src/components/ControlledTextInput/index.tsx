import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";

interface ControlledTextInputProps extends TextInputProps {
  error?: string;
  label?: string;
}

export default function ControlledTextInput<FormType extends FieldValues>({
  control,
  name,
  error,
  label,
  ...textInputProps
}: UseControllerProps<FormType> & ControlledTextInputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#919191"
              onChangeText={onChange}
              value={value}
              {...textInputProps}
            />
          </>
        )}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 40,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#FFF",
    marginBottom: 5
  },
  error: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#E94A47",
  },
});
