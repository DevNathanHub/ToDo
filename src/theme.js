// theme.js

import { extendTheme } from '@chakra-ui/react';
import { color } from 'framer-motion';

const customTheme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: '#BFD3DD',
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
      Divider: {
        baseStyle: {
          borderColor: '#3A2407', // Set the divider color to black
        },
      },
    
  },
});

export default customTheme;
