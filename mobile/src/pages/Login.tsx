import { useNavigation } from '@react-navigation/native';
import { Center, ScrollView, Text, useToast, VStack } from 'native-base'
import LogoSvg from '../../assets/Logo.svg'
import { Button } from '../components/Button'
import Input from '../components/input'
import { useAuth } from '../hooks/useAuth';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';
import * as yup from 'yup'
import { AppError } from '../utils/AppError';
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const signUpSchema = yup.object({
  email: yup.string().required('Informe o email').email("E-mail inválido"),
  password: yup.string().required('Informe a senha').min(6, "A senha deve ter pelo menos 6 digitos"),
})

export function Login() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false)
  const { SignIn, signOut, user } = useAuth()
  const toast = useToast()

  function handleGoToCreateUser() {
    navigation.navigate('CreateUser')
  }

  useEffect(() => {
    if(user.id){
      signOut()
    }
  },[]);

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  async function handleSignin({ email, password }: FormDataProps) {
    try {
      await SignIn(email, password)
      setIsLoading(true)

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente"
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setIsLoading(false)
    }

  }

  return (
    <ScrollView bg='gray.100' paddingBottom={8}>
      <VStack>
        <Center bg='gray.200' paddingX={12} borderRadius={24} paddingBottom={20}>

          <LogoSvg style={{ marginTop: 109 }} />
          <Text color={'gray.800'} marginTop={76} marginBottom={4}>Acesse sua conta</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                icon={false}
                onChangeText={onChange}
                value={value}
              errorMessage={errors.email?.message}
              />
            )
            }
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                icon
                onChangeText={onChange}
                value={value}
              errorMessage={errors.password?.message}
              />
            )
            }
          />
          <Button variant='blue' title='Entrar' onPress={handleSubmit(handleSignin)} isLoading={isLoading}/>
        </Center>
        <Center paddingX={12} paddingTop={20} >
          <Text color={'gray.800'} marginBottom={4}>Ainda não tem acesso?</Text>
          <Button variant='gray' title='Criar uma conta' onPress={handleGoToCreateUser} />
        </Center>
      </VStack>
    </ScrollView>
  )
}