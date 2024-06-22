import React, { useEffect, useState } from 'react';
import { Heading, VStack, Text, IconButton, HStack, TagLeftIcon, TagLabel, Tag, TagRightIcon, Button, Icon, CardBody, CardFooter, Card, Divider, Box } from '@chakra-ui/react';
import { useTodos } from '../context/TodosContext';
import { FaTrash, FaPen } from 'react-icons/fa6';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import useAuthConfig from '../Auth/AuthConfig';
import UpdateTodo from './UpdateTodo';
import AddTodo from './AddTodo';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { useUser } from '../context/UserContext';
import './Update.css';
import { baseUrl } from '../utils/baseUrl';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false); // State for modal
  const [selectedTodo, setSelectedTodo] = useState(null); // State to store selected todo
  const config = useAuthConfig();
  const { user } = useUser();
  const userId = user._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/todos`, config);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [config]);

  const handleDelete = async (id) => {
    console.log(userId);
    try {
      await axios.delete(`${baseUrl}/api/todos/${id}`, {
        data: { userId },
        ...config,
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const openUpdateModal = (todo) => {
    setSelectedTodo(todo);
    setIsOpenUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setIsOpenUpdateModal(false);
    setSelectedTodo(null);
  };
  const formatDate = (date) => {
    const parsedDate = new Date(date);
  
    if (isToday(parsedDate)) {
      return format(parsedDate, 'hh:mm a');
    } else if (isYesterday(parsedDate)) {
      return `${format(parsedDate, 'hh:mm a')} 1d Ago`;
    } else {
      const daysAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
      return `${format(parsedDate, 'hh:mm a')} ${daysAgo}`;
    }
  };
  
  return (
    <VStack>
      <HStack gap={6} align="start" justifyContent='space-between' w='100%' px={2}>
        <Heading>TodoList</Heading>
        <AddTodo />
      </HStack>
      <Box
        width="400px"
        height="600px"
        overflowY="scroll"
        p="4"
        borderColor="gray.200"
        borderRadius="md"
      >
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <VStack key={todo._id} align="start" borderWidth="1px" p="4" borderRadius="20px" w="100%" mb={2} className='glass'>
              <HStack align="start" justifyContent='space-between' w="100%">
                <HStack gap={4}>
                  <Tag colorScheme={todo.completed ? 'green' : 'red'} variant={todo.completed ? 'solid' : 'outline'} cursor='none'>
                    {todo.completed ? 'Done' : 'NotYet'}
                  </Tag>
                  <Heading size="md">{todo.title}</Heading>
                </HStack>
                <HStack>
                  <IconButton
                    onClick={() => openUpdateModal(todo)}
                    colorScheme='teal'
                    aria-label='Update'
                    icon={<FaPen />}
                    size='sm'
                    variant='ghost'
                  />
                  <IconButton
                    onClick={() => handleDelete(todo._id)}
                    colorScheme='red'
                    aria-label='Delete'
                    icon={<FaTrash />}
                    size='sm'
                    variant='ghost'
                  />
                </HStack>
              </HStack>
              <HStack>
                <Text>{todo.description}</Text>
              </HStack>
              <HStack width='100%'>
                <Tag fontSize='xs' w='200px' variant='ghost' > {formatDate(todo.createdAt)}</Tag>
                <Divider color='black'/>
                {todo && todo.createdAt !== todo.updatedAt ? (
                  <Tag fontSize='xs' w='200px' variant='outline'>
                    <TagLeftIcon as={CiEdit} /> {formatDate(todo.updatedAt)}
                  </Tag>
                ) : (
                  null
                )}
              </HStack>
            </VStack>
          ))
        ) : (
          <Text>No todos found.</Text>
        )}
      </Box>
      <UpdateTodo isOpen={isOpenUpdateModal} onClose={closeUpdateModal} id={selectedTodo?._id} title={selectedTodo?.title} description={selectedTodo?.description} completed={selectedTodo?.completed} />
    </VStack>
  );
  };
  
  export default TodoList;
  