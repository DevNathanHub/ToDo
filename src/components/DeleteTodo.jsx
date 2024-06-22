import axios from 'axios';
import fetchTodos from '../utils/fetchTodos';
import useAuthConfig from '../Auth/AuthConfig';

const deleteTodo = async (id) => {
    const config = useAuthConfig();

  try {
    await axios.delete(`http://localhost:3000/api/todos/${id}`, config);
    fetchTodos(); // Call fetchTodos to update the todos list
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

export default deleteTodo;
