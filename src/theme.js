import { extendTheme, position } from '@chakra-ui/react';

const customTheme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: '#FFFFFF',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        bgGradient: 'linear(to-l, #3A2407, #A06312 )',
        bgClip: 'text',
      },
    },
    Text: {
      baseStyle: {
        color: 'black',
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'gray.100',
            _hover: {
              bg: 'gray.200',
            },
            _focus: {
              bg: 'gray.200',
              borderColor: 'gray.500',
            },
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: '#3A2407',
      },
    },
   
  },
});

export default customTheme;
