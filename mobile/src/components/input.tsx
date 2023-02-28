import { Input as NativeBasInput, IInputProps, FormControl, Icon, View, HStack } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react';

type Props = IInputProps & {
  errorMessage?: string | null
  icon?: boolean
}

export default function Input({ errorMessage = null, icon = false, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  const [visible, setVisible] = useState(false)

  function ChangeVisibility(){
    if(visible){
      setVisible(false)
    }else{
      setVisible(true)
    }
  }

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <HStack bg="gray.100"
        h={14}
        borderRadius={6}
        >
      <NativeBasInput
        secureTextEntry = {visible}
        flex={1}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.500"
        fontFamily='body'
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        _focus={{
          bg: 'gray.100',
        }}
        {...rest}
      />

      {visible && icon ?
      <Feather name='eye' size={20} style={{alignSelf:'center', marginRight: 16}} onPress={ChangeVisibility}/>
      : icon &&
      <Feather name='eye-off' size={20} style={{alignSelf:'center', marginRight: 16}} onPress={ChangeVisibility}/>
      }
      

      </HStack>
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>

  )
}

export function SearchInput({ errorMessage = null,  isInvalid, ...rest }: Props) {
  const [visible, setVisible] = useState(false)

  function ChangeVisibility(){
    if(visible){
      setVisible(false)
    }else{
      setVisible(true)
    }
  }

  return (
    <FormControl mb={4}>
      <HStack bg="gray.100"
        h={14}
        borderRadius={6}
        >
      <NativeBasInput
        secureTextEntry = {visible}
        flex={1}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.500"
        fontFamily='body'
        placeholderTextColor="gray.400"
        _focus={{
          bg: 'gray.100',
        }}
        {...rest}
      />
      <Feather name='search' size={20} style={{alignSelf:'center', marginRight: 16}} onPress={ChangeVisibility}/>
      <Feather name='sliders' size={20} style={{alignSelf:'center', marginRight: 16}} onPress={ChangeVisibility}/>
      </HStack>
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>

  )
}