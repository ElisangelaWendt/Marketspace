import { Image, Text, VStack } from "native-base";

export function Card(){
  return(
    <VStack>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg"}} h={38} w={40} alt="Imagem do produto"/>
      <Text>Nome</Text>
      <Text>RS </Text>
    </VStack>
  )
}