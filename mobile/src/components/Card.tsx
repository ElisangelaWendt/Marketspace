import { HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

interface CardProps{
  onPress: () => void;
  name: string;
  value: string
}

export function Card({onPress, name, value}: CardProps){
  return(
    <TouchableOpacity onPress={onPress}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg"}} h={38} w={40} alt="Imagem do produto"/>
      <Text fontSize='sm'>{name}</Text>
      <HStack>

      <Text fontFamily='heading' fontSize='md'>RS {value}</Text>
      </HStack>
    </TouchableOpacity>
  )
}