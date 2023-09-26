import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle
} from "react-native";

interface Props extends PressableProps {
  title: string;
  outline?: boolean;
}

export default function Button({ title, outline, onPress, ...rest }: Props) {

  function getButtonStyle() {
    const buttonStyles: StyleProp<ViewStyle>[] = [styles.container]
    outline ? buttonStyles.push(styles.secondary) : buttonStyles.push(styles.primary)
    return buttonStyles
  }

  function getTextStyle() {
    const textStyles: StyleProp<TextStyle>[] = [styles.text]
    outline ? textStyles.push(styles.textSecondary) : textStyles.push(styles.textPrimary)
    return textStyles
  }

  return (
    <Pressable onPress={onPress} {...rest}>
      <View style={getButtonStyle()}>
        <Text style={getTextStyle()}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    minWidth: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E94A47',
  },
  primary: {
    backgroundColor: '#E94A47',
  },
  secondary: {
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  textPrimary: {
    color: '#FFF',
  },
  textSecondary: {
    color: '#E94A47'
  }
});
