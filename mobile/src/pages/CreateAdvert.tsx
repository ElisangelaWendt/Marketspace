import { Checkbox, HStack, ScrollView, Switch, Text, View, VStack } from "native-base";
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
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { SquareCheckbox } from "../components/SquareCheckbox";
import { PaymentMethodsDTO } from "../dtos/paymentMethodsDTO";
import { api } from "../services/api";

type FormDataProps = {
  avatar: string
  name: string;
  value: string;
  description: string
  acceptChange: string;
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
  const [checkedNew, setCheckedNew] = useState(true)
  const [checkedUsed, setCheckedUsed] = useState(false)
  const [trade, setTrade] = useState(false)
  const [photo, setPhoto] = useState('')
  const [exphoto, setexPhoto] = useState()
  var photoInfo;
  const userPhotoUploadForm = new FormData()
  const [boleto, setBoleto] = useState(false)
  const [pix, setPix] = useState(false)
  const [money, setMoney] = useState(false)
  const [credit, setCredit] = useState(false)
  const [deposito, setDeposito] = useState(false)
  const [payment_methods, setPayment_methods] = useState([
    
  ])


  async function check() {
    if (checkedNew) {
      await setCheckedNew(false)
      await setCheckedUsed(true)
    } else {
      await setCheckedNew(true)
      await setCheckedUsed(false)
    }
  }

  async function handleProductPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        // base64: true
      })

      if (photoSelected.canceled) {
        return
      }
      if (photoSelected.assets[0].uri) {
        //informações da foto
        photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        setPhoto(photoInfo.uri)
        setexPhoto(photoSelected.assets[0].type)

      }
    } catch (error) {
      console.log(error)
    } finally {
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
  //     ProductUploadForm.append('name', name)
  //     ProductUploadForm.append('description', description)
  //     ProductUploadForm.append('is_new', is_new)
  //     ProductUploadForm.append('price', price)
  //     ProductUploadForm.append('accept_trade', accept_trade)
  //     ProductUploadForm.append('payment_methods', payment_methods)
  // {
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
      <ScrollView marginX={6} showsVerticalScrollIndicator={false}>

        <Text fontFamily='heading' fontSize='md' mb={1}>
          Imagens
        </Text>
        <Text fontSize='sm' mb={4}>
          Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
        </Text>
        <TouchableOpacity
          onPress={handleProductPhotoSelect}
          style={{ backgroundColor: '#D9D8DA', height: 100, width: 100, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}  >
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
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Descrição do produto"
              multiline
              height={160}
              onChange={onChange}
              value={value}
            />
          )} />

        <HStack mb={8}>

          <Checkbox
            isChecked={checkedNew}
            onChange={() => check()}
            value={"Produto novo"}
            rounded="full"
            mr={5}
          >
            <Text>Produto Novo</Text>
          </Checkbox>
          <Checkbox
            isChecked={checkedUsed}
            onChange={() => check()}
            value={"Produto usado"}
            rounded="full"
          >
            <Text>Produto Usado</Text>
          </Checkbox>
        </HStack>
        <Text fontFamily='heading' fontSize='md'>Vendas</Text>
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
        <Text fontFamily='heading'>Aceita troca?</Text>
        <Switch size="lg" alignSelf='flex-start' onValueChange={() => setTrade(!trade)} />
        <Text fontFamily='heading' mb={3}>Meios de pagamentos aceitos:</Text>
        <SquareCheckbox isChecked={boleto} onChange={() => setBoleto(!boleto)} text="Boleto" />
        <SquareCheckbox isChecked={pix} onChange={() => setPix(!pix)} text="Pix" />
        <SquareCheckbox isChecked={money} onChange={() => setMoney(!money)} text="Dinheiro" />
        <SquareCheckbox isChecked={credit} onChange={() => setCredit(!credit)} text="Cartão de Crédito" />
        <SquareCheckbox isChecked={deposito} onChange={() => setDeposito(!deposito)} text="Depósito Bancário" />
      </ScrollView>
      <Footer title="Cancelar" title2="Avançar" variant1="gray" variant2="blue" />
    </>
  )
}