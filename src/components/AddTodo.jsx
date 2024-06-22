// AddTodo.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { useUser } from '../context/UserContext';
import useAuthConfig from '../Auth/AuthConfig';
import { FaPlusCircle } from 'react-icons/fa';

function AddTodo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ title: '', description: '' });
  const { user, setTodos } = useUser();
  const config = useAuthConfig();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      userId: user._id,
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("form data on add todo", formData);
      await axios.post('http://localhost:3000/api/todos', formData, config);
      console.log('Form submitted');
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <div>
      <IconButton
        icon={<FaPlusCircle />}
        onClick={onOpen}
        aria-label="Add new todo"
        variant="outline"
        colorScheme="teal"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="title" mb={4}>
                <FormLabel>Add Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl id="description" mb={4}>
                <FormLabel>Add Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>
                  Add summary of what you have to accomplish
                </FormHelperText>
              </FormControl>
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddTodo;
