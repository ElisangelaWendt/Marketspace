import { HStack, Image, Text, View, VStack } from "native-base"
import { useState } from "react"
import { Button } from "./Button"
import {Feather} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"

export function Header() {

  return (
    <HStack marginTop={16} justifyContent="space-between">
      <Image source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} rounded='full' size={45} alt={"Foto do usuário"} />
      <VStack>
        <Text fontSize='md'>Boas Vindas</Text>
        <Text fontFamily='heading' fontSize='md'>Nome</Text>
      </VStack>
      <Button title="+ Criar Anúncio" variant='black' w={140} alignSelf='flex-end' />
    </HStack>
  )
}

interface SimpleHeaderProps {
  canGoBack?: boolean,
  title: string,
  add?: boolean,
  rightIcon?: boolean,
  onPress?: () => void
}

export function SimpleHeader({ canGoBack, title, add, rightIcon, onPress }: SimpleHeaderProps) {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <HStack justifyContent='space-between' marginTop={16} >
      {canGoBack ?
      <Feather name="arrow-left" onPress={navigation.goBack} size={24} />
      :
      <View marginLeft={4}></View>
      }
      <Text fontSize='xl' fontFamily='heading'>{title}</Text>
      {add && rightIcon ?
        <Feather name="plus" size={24} onPress={onPress}/>
        : rightIcon && 
        <Feather name="edit-3" size={24}/>
      }
      {!rightIcon && <View></View>}
    </HStack>
  )
}