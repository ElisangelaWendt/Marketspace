import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import {useFonts,Karla_700Bold , Karla_400Regular} from '@expo-google-fonts/karla'
import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_700Bold, Karla_400Regular})

  return (
    <NativeBaseProvider theme={THEME}>
    <StatusBar
    barStyle="light-content"
    backgroundColor="transparent"
    translucent
    />
    {/* <AuthContextProvider> */}

    {fontsLoaded ? <Routes/> : <Loading/>}
    {/* </AuthContextProvider> */}
    </NativeBaseProvider>
  );
}
