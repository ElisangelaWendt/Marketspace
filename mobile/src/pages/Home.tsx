import { HStack, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Header } from "../components/Header";
import { Feather } from '@expo/vector-icons'
import Input, { SearchInput } from "../components/input";
import { Card } from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/BottomTab";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../services/api";
import { ProductDTO } from "../dtos/productDTS";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [products, setProducts] = useState<ProductDTO[]>([])

  function handleGoToDetails(){
    navigation.navigate("Details")
  }

  async function fetchProducts(){
    try{
      const response = await api.get('/products')
      setProducts(response.data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  },[])

  return (
    <ScrollView marginX={6}>
      <Header />
      <Text color='gray.500' fontSize='sm' mt={8}>Seus produtos anunciados para venda</Text>
      <TouchableOpacity style={{
        backgroundColor: '#DFE1EA',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 12
      }}>
        <HStack alignItems='center'>
          <Feather name="tag" size={22} color="#364D9D" />
          <VStack flex={1} marginLeft={4}>
            <Text fontFamily={'heading'} fontSize="xl">4</Text>
            <Text fontSize={'xs'}>Anúncios ativos</Text>
          </VStack>
          <Text fontSize={'xs'} color="blue.600" fontFamily='heading'>Meus anúncios <Feather name='arrow-right' /></Text>
        </HStack>
      </TouchableOpacity>
      <Text color='gray.500' fontSize='sm' mt={8} mb={3}>Seus produtos anunciados para venda</Text>
      <SearchInput placeholder="Buscar Anúncio"/>
      <Card name="Nome" onPress={handleGoToDetails} value="valor"/>
    </ScrollView>
  )
}