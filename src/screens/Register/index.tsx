import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Background from "../../assets/login_background.jpg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextInput from "../../components/ControlledTextInput";
import { registerUser } from "../../utils/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Routes";
import { UserContext } from "../../common/contexts/User";
import { useBasketContext } from "../../common/contexts/Basket";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

interface Props
  extends NativeStackScreenProps<RootStackParamList, "Register"> {}

export default function RegisterScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { setName, setEmail, setUserId } = useContext(UserContext);
  const { basket } = useBasketContext();

  const onSubmitHandler = (formData: FormData) => {
    const { name, email, password } = formData;
    const id = uuidv4();
    registerUser(name, email, password, id);
    setName(name);
    setEmail(email);
    setUserId(id);
    reset();

    const isBasketEmpty = basket.length == 0;
    if (isBasketEmpty) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Checkout");
    }
  };

  function goBackHome() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={Background}
          alt="Imagem de background"
        />
      </View>
      <View style={styles.fieldsContainer}>
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.fields}>
          <ControlledTextInput
            name="name"
            control={control}
            placeholder="Name"
            error={errors.name?.message}
          />

          <ControlledTextInput
            name="email"
            control={control}
            placeholder="Email"
            error={errors.email?.message}
          />

          <ControlledTextInput
            name="password"
            control={control}
            placeholder="Password"
            error={errors.password?.message}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="<" onPress={goBackHome} />
          <Button title="Register" onPress={handleSubmit(onSubmitHandler)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 150,
    borderBottomRightRadius: 150,
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
  },
  fieldsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: 20,
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
