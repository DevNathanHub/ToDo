import axios from 'axios';

export async function signup(formData) {
  const { fullName, email, password } = formData;
  const user = { fullName, email, password };

  // Simulate an API call
  // In a real app, replace this with an actual API endpoint
  return axios.post('http://localhost:3000/api/signup', user)
    .then(response => {
      // Assuming the API returns a success response
      return response.data;
    })
    .catch(error => {
      console.error('Signup failed', error);
      throw error;
    });

    
}
