import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    bg: '#2D2F36',
    base: {
      dark: '#222429',
      light: '#2C2F36',
      lighter: '#6C7284',
    },
  },
  styles: {
    global: {
      'html, body': {
        bg: 'bg', // 背景色
      },
    },
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
})
