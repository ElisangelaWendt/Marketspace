import { HStack, Image, Text, View, VStack } from "native-base"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import { useAuth } from "../hooks/useAuth"
import { api } from "../services/api"
import { AppNavigatorRoutesProps } from "../routes/BottomTab"

export function Header() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth()

  function handleNavigateToCreateAdvert() {
    navigation.navigate("CreateAdvert")
  }

  return (
    <HStack marginTop={16} justifyContent="space-between">
      <HStack>
        {user.avatar
          &&
          <Image source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }} rounded='full' size={45} alt={"Foto do usuário"} />
        }
        <VStack ml={3}>
          <Text fontSize='md'>Boas Vindas</Text>
          <Text fontFamily='heading' fontSize='md'>{user.name}</Text>
        </VStack>
      </HStack>
      <Button title="+ Criar Anúncio" variant='black' w={140} alignSelf='flex-end' onPress={handleNavigateToCreateAdvert} />
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
    <HStack justifyContent='space-between' marginTop={16} marginBottom={4} paddingX={6}>
      {canGoBack ?
        <Feather name="arrow-left" onPress={navigation.goBack} size={24} />
        :
        <View marginLeft={4}></View>
      }
      <Text fontSize='xl' fontFamily='heading'>{title}</Text>
      {add && rightIcon ?
        <Feather name="plus" size={24} onPress={onPress} />
        : rightIcon &&
        <Feather name="edit-3" size={24} />
      }
      {!rightIcon && <View></View>}
    </HStack>
  )
}