import { env } from '../env';
import axios from 'axios';
import { UserLoginData, UserRegistrationData } from '../types/auth';

const API_URL = env.VITE_API_URL;

const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export const registerUser = async (userData: UserRegistrationData) => {
  try {
    const response = await authClient.post('/auth/register', userData);
    if (response.status !== 201) {
      throw new Error('Failed to register user');
    }
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
export const loginUser = async (userData: UserLoginData) => {
  try {
    const response = await authClient.post('/auth/login', userData);
    if (response.status !== 200) {
      throw new Error('Failed to log in user');
    }
    console.log('Login response:', response);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
