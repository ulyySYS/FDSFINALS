import axios from 'axios';

// Define base URL for API calls
const API_URL = 'http://localhost:3000';

// Login function to authenticate users
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/users`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    // If there's an error with the request
    if (error.response) {
      // if request was made, but the server responded with an error status
      return error.response.data;
    } else {
      // Something happened in setting up the request
      throw new Error('Network error occurred');
    }
  }
};