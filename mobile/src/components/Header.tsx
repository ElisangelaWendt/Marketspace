import { HStack, Image, Text, VStack } from "native-base"
import { Button } from "./Button"

export function Header() {

  return (
    <HStack marginTop={16} justifyContent="space-between">
      <Image source={{ uri: "https://wallpaperaccess.com/full/317501.jpg"}} rounded='full' size={45} alt={"Foto do usuário"}/>
      <VStack>
        <Text fontSize='md'>Boas Vindas</Text>
        <Text fontFamily='heading' fontSize='md'>Nome</Text>
      </VStack>
      <Button title="+ Criar Anúncio" variant='black' w={140} alignSelf='flex-end'/>
    </HStack>
  )
}