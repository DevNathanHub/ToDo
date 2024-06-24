import React from 'react'
import imgMain from '../assets/Work.gif';
import { Box, Image } from '@chakra-ui/react';

function ImageContainer() {
  return (
        <Box width='100%' display='flex' alignItems='center' justifyContent='center' mb={4} >
            <Image src={imgMain} alt='Main Image' w='300px' h='230px' borderRadius='20px'/>
          </Box>
  )
}

export default ImageContainer