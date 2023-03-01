import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import { SimpleHeader } from '../components/Header'
import { AppNavigatorRoutesProps } from '../routes/AppRoutesWithoutBottomTab';

export function Advert(){
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoToCreateAdvert(){
    navigation.navigate("CreateAdvert")
  }

  return(
    <ScrollView marginX={6}>
    <SimpleHeader add rightIcon title="Meus anúncios" onPress={handleGoToCreateAdvert} />
    </ ScrollView>
  )
}