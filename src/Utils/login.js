import axios from 'axios';
import { baseUrl } from './baseUrl';

export async function login(formData) {
  const { email, password } = formData;

  if (email && password) {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, { email, password });
      const { token, sanitizedUser } = response.data;
      const user = {...sanitizedUser};
      console.log("new user", user);
      // Save user data and token to local storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { token, user };
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  } else {
    throw new Error('Invalid email or password');
  }
}
