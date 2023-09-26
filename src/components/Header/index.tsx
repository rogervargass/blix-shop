import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { useContext } from "react";
import { UserContext } from "../../common/contexts/User";
import LogoBlix from "../../assets/logo_blix.png"

interface Props {
  onPressRegister: () => void;
  onPressLogin: () => void;
}

export default function Header({ onPressRegister, onPressLogin }: Props) {
  const userContext = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={LogoBlix} />
      {userContext?.name ? (
        <Text style={styles.welcome}>{`Hello, ${userContext.name}`}</Text>
      ) : (
        <View style={styles.buttonsContainer}>
          <Button title="Cadastro" outline onPress={onPressRegister} />
          <Button title="Login" onPress={onPressLogin} disabled/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  welcome: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "#FFF"
  }
});
