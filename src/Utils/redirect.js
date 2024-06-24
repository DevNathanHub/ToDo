// utils/redirect.js
import { isTokenValid } from './auth';

export function handleRedirect(navigate) {
  const token = localStorage.getItem('token');
  if (isTokenValid(token)) {
    navigate('/todos');
  } else {
    navigate('/login');
  }
}
