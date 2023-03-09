import { Text, View, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { SimpleHeader } from "../components/Header";
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import Input from "../components/input";

export function CreateAdvert() {

  async function handleUserPhotoSelect() {
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
        // const userPhotoUploadForm = new FormData()
        // userPhotoUploadForm.append('avatar', photoFile)

        console.log(fileExtension)

      }

    } catch (error) {
      console.log(error)
    } finally {
      // setPhotoIsLoading(false)
    }
  }

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
        <Input
          placeholder="Título do anúncio"
        />
        <Input
          placeholder="Descrição do produto"
          multiline
          height={160}
        />
      </VStack>
    </>
  )
}