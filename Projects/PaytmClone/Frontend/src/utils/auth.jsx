import axios from 'axios';

// Function to validate the token
export const validateToken = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200; // Token is valid
  } catch (error) {
    return false; // Token is invalid or expired
  }
};
