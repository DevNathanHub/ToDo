import axios from 'axios';
import { useTodos } from '../context/TodosContext';
import useAuthConfig from '../Auth/AuthConfig';

const fetchTodos = async () => {
    const { setTodos } = useTodos();
    const config = useAuthConfig();

  try {
    const response = await axios.get('http://localhost:3000/api/todos', config);
    setTodos(response.data);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
};

export default fetchTodos;
