import { Box } from "@chakra-ui/react";

export default function ButtonComponent() {
  return (
    <Box
        as='button'
        p={2}
        color='white'
        fontWeight='bold'
        borderRadius='60px'
        bgGradient='linear(to-r, #E36565, #E36565)'
        width='310px'
        height='50px'
        
    >
        Click here
    </Box>
  )
}
