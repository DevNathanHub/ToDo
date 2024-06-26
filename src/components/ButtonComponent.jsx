import { Box, HStack, Text } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ButtonComponent({onClick, children, ...props}) {

  return (
    <Box
        as='button'
        p={2}
        mb={4}
        color='white'
        fontWeight='bold'
        borderRadius='60px'
        bgGradient='linear(to-r, #E36565, #E36565)'
        width='310px'
        height='50px'
        onClick={onClick}
        {...props}
        
    >
    
      <HStack justifyContent='center'>
        <Box color='white'>{children}</Box>
        <FaArrowRightLong/>
      </HStack>
     
    </Box>
  )
}
