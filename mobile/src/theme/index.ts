import { extendTheme} from 'native-base'

export const THEME = extendTheme(
{
  colors: {
    blue: {
      600: '#364D9D',
      400: '#647AC7',
    },
    gray: {
      900: '#1A181B',
      800:'#3E3A40',
      500:'#5F5B62',
      400:'#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8'
    },
    white: '#FFFFFF',
    red: {
      500: '#F75A68'
    }
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148
  }
}
)