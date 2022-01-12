import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: '#2D2F36', // 背景色
      },
    },
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
})
