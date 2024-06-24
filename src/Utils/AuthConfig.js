// useAuthConfig.js
import { useUser } from "../context/UserContext";

const useAuthConfig = () => {
  const { token } = useUser();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };

  return config;
};

export default useAuthConfig;
