import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalCloseButton, FormControl, FormLabel, Input, Checkbox, Button,
  ModalFooter
} from '@chakra-ui/react';
import useAuthConfig from '../Utils/AuthConfig';
import fetchTodos from '../Utils/fetchTodos';
import { useUser } from '../context/UserContext';
import './Update.css';
import { baseUrl } from '../Utils/baseUrl';

const UpdateTodo = ({ id, title: initialTitle, description: initialDescription, completed: initialCompleted, isOpen, onClose }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [completed, setCompleted] = useState(initialCompleted);
  const config = useAuthConfig();
  const { user } = useUser();
  const userId = user._id;

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setCompleted(initialCompleted);
  }, [initialTitle, initialDescription, initialCompleted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/todos/${id}`, { title, description, completed, userId }, config);
      fetchTodos(); // Call fetchTodos to update the todos list
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error('Failed to update todo:', error);
      // Add error handling here (e.g., show an error message to the user)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent className='glass'>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Edit Title (optional)</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            </FormControl>
            <FormControl mb={8}>
              <FormLabel>Edit Description (optional)</FormLabel>
              <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
            </FormControl>
            <FormControl mb={4}>
              <Checkbox
                isChecked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                size="lg"
                colorScheme="blue"
              >
                Mark Complete
              </Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="teal" mr={3}>Save Changes</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTodo;
