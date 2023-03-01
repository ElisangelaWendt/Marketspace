import { HStack, Image, ScrollView, Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { SimpleHeader } from "../components/Header";

export function Details() {
  return (
    <View flex={1}>
      <SimpleHeader
        title=""
        canGoBack

      />
      <Image w={"100%"} h={280} source={{ uri: "https://images.tcdn.com.br/img/img_prod/467173/bicicleta_eletrica_aro_26_bateria_de_litio_teccity_14_1_20200109151903.jpg" }} alt="Imagem do anúncio" />
      <VStack marginX={6} marginY={5} flex={1}>
      <ScrollView>
      <HStack>
        <Image size={6} rounded="full" source={{ uri: "https://images.tcdn.com.br/img/img_prod/467173/bicicleta_eletrica_aro_26_bateria_de_litio_teccity_14_1_20200109151903.jpg" }} alt="Imagem do usuário" />
        <Text ml={2}>Nome do usuário</Text>
      </HStack>
      <View mt={7} bgColor="gray.300" maxW={14} alignItems="center" rounded='full'>
        <Text fontFamily='heading'>Usado</Text>
      </View>
      <HStack>
      <Text fontFamily='heading' fontSize='xl'>Nome do item</Text>
      <Text color='blue.400'>Preço</Text>
      </HStack>
      <Text>Descrição</Text>
      <HStack>
      <Text>Aceita troca?</Text>
      <Text>Sim/não</Text>
      </HStack>
      <Text fontFamily='heading'>
        Meios de pagamento:
      </Text>
      </ScrollView>
      </VStack>
      <HStack  justifyContent='space-between' alignItems='center' marginX={6} marginY={5} bg="red.200">
        <Text>Valor</Text>
        <Button 
        variant='blue'
        title="Entrar em contato"
        w={130}
        />
      </HStack>
    </View>
  )
}