import { Checkbox, Text, View, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { SimpleHeader } from "../components/Header";
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import Input from "../components/input";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormDataProps = {
  avatar: string
  name: string;
  value: string;
  tel: string
  password: string;
  passwordConfirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  email: yup.string().required('Informe a descrição'),
  password: yup.string().required('Informe a senha').min(6, "A senha deve ter pelo menos 6 digitos"),
  passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref("password")], "A confirmação de senha deve ser igual a senha"),
  tel: yup.string().required("Informe o telefone").min(11, "O número de telefone deve ter 11 digitos")
})

export function CreateAdvert() {
  const ProductUploadForm = new FormData()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })
  const [ checkedNew, setCheckedNew] = useState(false)
  const [ checkedUsed, setCheckedUsed] = useState(false)

  function check(){
    if(checkedNew){
      setCheckedNew(false)
    }else{
      setCheckedNew(true)
    }
  }
  
  async function handleProductPhotoSelect() {
    // setPhotoIsLoading(true)
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
        // const ProductUploadForm = new FormData()
        // ProductUploadForm.append('avatar', photoFile)

        console.log(fileExtension)

      }

    } catch (error) {
      console.log(error)
    } finally {
      // setPhotoIsLoading(false)
    }
  }

  // function Register() {
  //   try {
  //     const fileExtension = photo.split('.').pop()

  //     const photoFile = {
  //       // //junta o nome do usuário + extensão + deixa tudo minusculo
  //       name: `${name}.${fileExtension}`.toLowerCase(),
  //       uri: photo,
  //       type: `${exphoto}/${fileExtension}`
  //     } as any
  //     ProductUploadForm.append('avatar', photoFile)
  //     ProductUploadForm.append('name', name)
  //     ProductUploadForm.append('email', email)
  //     ProductUploadForm.append('tel', tel)
  //     ProductUploadForm.append('password', password)


  //     const data = await api.post('users', ProductUploadForm, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //   } catch (error) {

  //   }
  // }

  return (
    <>
      <SimpleHeader
        canGoBack
        title="Criar anúncio"
      />
      <VStack marginX={6}>

        <Text fontFamily='heading' fontSize='md' mb={1}>
          Imagens
        </Text>
        <Text fontSize='sm' mb={4}>
          Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
        </Text>
        <TouchableOpacity style={{ backgroundColor: '#D9D8DA', height: 100, width: 100, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}  >
          <Feather name="plus" size={24} color="#9F9BA1" />
        </TouchableOpacity>
        <Text fontFamily='heading' fontSize='md' mt={8}>
          Sobre o produto
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Título do anúncio"
              onChange={onChange}
              value={value}
            />
          )} />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Descrição do produto"
              multiline
              height={160}
              onChange={onChange}
              value={value}
            />
          )} />
        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Valor do produto"
              onChange={onChange}
              value={value}
            />
          )} />
        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, value } }) => (
            <Checkbox
            isChecked={checkedNew}
            value={value}
            rounded="full"
            
            >
              <Text>aaaaaa</Text>
            </Checkbox>
          )} />
      </VStack>
    </>
  )
}