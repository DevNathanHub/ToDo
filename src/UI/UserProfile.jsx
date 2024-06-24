        import React, { useRef, useState } from 'react';
        import {
        Box,
        Button,
        AlertDialog,
        AlertDialogBody,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogContent,
        AlertDialogOverlay,
        useToast,
        Flex,
        Text,
        Avatar,
        HStack,
        VStack,
        } from '@chakra-ui/react';
        import { logout } from '../Utils/auth';
        import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';

        function UserProfile() {
        // State and refs
        const [isOpen, setIsOpen] = useState(false);
        const cancelRef = useRef();
        const toast = useToast();

        // Context and user data
        const { user } = useUser();
        const { fullName, email } = user;
        const initials = fullName
            ? fullName.split(' ').map(name => name[0]).join('')
            : email.split('@')[0][0];
        const navigate = useNavigate();

        // Event handlers
        const onClose = () => setIsOpen(false);

     

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
                title: 'Logged Out!',
                description: 'Logged out successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');

        };

        return (
            <HStack w='100%'  gap={4} padding={3} borderRadius='60px' borderWidth='1px'>
            {/* Avatar and User Info */}
            <HStack display='flex' justifyContent='space-evenly' w='100%'>
                <Avatar size="md" name={fullName || email} w='70px' h='70px'/>
                <VStack display='flex' alignItems='flex-start'>
                   <Text fontSize='2xl' >{fullName || email}</Text>
                    <Text fontSize='xs' >{email}</Text>
             
                </VStack>
               
         
               
                {/* Logout Button */}
                <Button colorScheme="red" variant='outline' onClick={() => setIsOpen(true)} borderRadius='60px' rightIcon={<TbLogout/>}>
                    Logout
                </Button>
                </HStack>
            

            

            {/* Logout Confirmation Dialog */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirm Logout
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure you want to log out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleLogout} ml={3}>
                        Logout
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            
          
            </AlertDialog>
            </HStack>
        );
        }

        export default UserProfile;
