import axios from 'axios';
import { useTodos } from '../context/TodosContext';
import useAuthConfig from '../Utils/AuthConfig';

const fetchTodos = async () => {
    const { setTodos } = useTodos();
    const config = useAuthConfig();

  try {
    const response = await axios.get(`${baseUrl}/api/todos`, config);
    setTodos(response.data);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
};

export default fetchTodos;
