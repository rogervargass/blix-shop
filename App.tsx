import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import './firebase.config'
import UserProvider from './src/common/contexts/User';
import BasketProvider from './src/common/contexts/Basket';
import PaymentProvider from './src/common/contexts/Payment';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <BasketProvider>
        <UserProvider>
          <PaymentProvider>
            <StatusBar style="auto" />
            <Routes />
          </PaymentProvider>
        </UserProvider>
      </BasketProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
