import { Button as ButtonNativeBase, IButtonProps,  Text} from 'native-base'

type Props = IButtonProps &{
  title: string,
  variant?: 'blue' | 'gray' | 'black' //ou é outline ou é solid
}

export function Button({ title, variant = 'blue', ...rest}: Props){
  return(
    <ButtonNativeBase
    w="full"
    h={10}
    bg={variant === "blue" ? "blue.400" : variant === 'gray' ? 'gray.300' : 'gray.900'}
    borderColor="green.500"
    rounded="sm"
    _pressed={{
      bg: variant === "gray" ? 'gray.400' : 'blue.600'
    }}
    {...rest}
    >
      <Text 
      color={ variant === 'gray' ? "gray.800" : "white"}
      fontFamily='heading'
      fontSize="sm"
      >
        {title}
      </Text>

    </ButtonNativeBase>
  )
}