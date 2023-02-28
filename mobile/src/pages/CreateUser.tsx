import { Center, ScrollView, Text, useToast } from 'native-base'
import Icon from '../../assets/Icon.svg'
import Input from '../components/input'
import { TouchableOpacity } from 'react-native';
import AvatarSvg from '../../assets/Avatar.svg'
import ButtonSvg from '../../assets/Button.svg'
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AppError } from '../utils/AppError';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

type FormDataProps = {
  avatar: string
  name: string;
  email: string;
  tel: string
  password: string;
  passwordConfirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o email').email("E-mail inválido"),
  password: yup.string().required('Informe a senha').min(6, "A senha deve ter pelo menos 6 digitos"),
  passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref("password")], "A confirmação de senha deve ser igual a senha"),
  tel: yup.string().required("Informe o telefone").min(11, "O número de telefone deve ter 11 digitos")
})

export function CreateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { SignIn } = useAuth()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const { user, updateUserProfile } = useAuth()


  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  function handleNavigateToLogin() {
    navigation.navigate('Login')
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }
      if (photoSelected.assets[0].uri) {
        //informações da foto
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        //caso queira limitar o tamanho da foto
        // if (photoInfo.size && (photoInfo.size / 2048) > 100) {
        //   return toast.show({
        //     title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
        //     placement: 'top',
        //     bgColor: 'red.500'
        //   })
        // }

        //extensão da foto
        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        // const photoFile = {
          //junta o nome do usuário + extensão + deixa tudo minusculo
        //   name: `${user.name}.${fileExtension}`.toLowerCase(),
        //   uri: photoSelected.assets[0].uri,
        //   type: `${photoSelected.assets[0].type}/${fileExtension}`
        // }as any

        //criar formulário para enviar o arquivo da foto para o backend
        // const userPhotoUploadForm = new FormData()
        // userPhotoUploadForm.append('avatar', photoFile)

        console.log(fileExtension)

      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleSignUp({ avatar, name, email, tel, password }: FormDataProps) {
    // try {
    //   setIsLoading(true)
    //   await api.post('/users', { avatar, name, email, tel, password })
    //   await SignIn(email, password)
    // } catch (error) {
    //   console.log(error)
    //   setIsLoading(false)
    //   const isAppError = error instanceof AppError
    //   const title = isAppError ? error.message : 'Não foi possível criar conta. Tente novamente mais tarde'

    //   toast.show({
    //     title,
    //     placement: 'top',
    //     bgColor: 'red.500'
    //   })
    // }
  }

  return (
    <ScrollView paddingX={12}>
      <Center marginTop={16}>

        <Icon />
        <Text fontFamily='heading' fontSize='xl' marginBottom={2}>Boas Vindas!</Text>
        <Text fontSize={'sm'}>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
        <TouchableOpacity
        onPress={handleUserPhotoSelect}
        style={{ borderWidth: 2, borderRadius: 100, width: 88, height: 88, borderColor: '#647AC7' }} >
          <ButtonSvg style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: 44 }} />
        </TouchableOpacity>
      </Center>
      <Center marginY={6}>
        <Controller
          control={control}
          name="avatar"
          render={({ field: { onChange, value } }) => (
            <Input placeholder='Nome' icon={false}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}/>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input placeholder='Nome' icon={false}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}/>
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
          name="tel"
          render={({ field: { onChange, value } }) => (
            <Input
            keyboardType='number-pad'
              placeholder='Telefone'
              icon={false}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.tel?.message}
            />
          )} />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input placeholder='Senha' icon
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )} />
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, value } }) => (
            <Input placeholder='Confirmar senha' icon
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirm?.message}
            />
          )} />
      </Center>
      <Button title='Criar' variant='black' onPress={handleSubmit(handleSignUp)} isLoading={isLoading} />
      <Center paddingX={12} paddingTop={12} paddingBottom={10}>
        <Text color={'gray.800'} marginBottom={4}>Já tem uma conta?</Text>
        <Button variant='gray' title='Ir para o login' onPress={handleNavigateToLogin} />
      </Center>
    </ScrollView>
  )
}