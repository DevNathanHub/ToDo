import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Checkbox, Button } from '@chakra-ui/react';
import useAuthConfig from '../Auth/AuthConfig';
import fetchTodos from '../utils/fetchTodos';

const UpdateTodo = ({ id, title: initialTitle, description: initialDescription, completed: initialCompleted, isOpen, onClose }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [completed, setCompleted] = useState(initialCompleted);
  const config = useAuthConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, config, { title, description, completed });
      fetchTodos();// Call fetchTodos to update the todos list
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl>
              <Checkbox isChecked={completed} onChange={(e) => setCompleted(e.target.checked)}>Completed</Checkbox>
            </FormControl>
            <Button type="submit">Save Changes</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTodo;
