import { env } from '@/env';
import axios from 'axios';

const API_URL = env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const fetchSubjects = async () => {
  try {
    const response = await axiosInstance.get('/subjects');
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const fetchSubjectParallels = async (subjectCode: string) => {
  try {
    const response = await axiosInstance.get(`/parallels/${subjectCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subject paralles:', error);
    throw error;
  }
};

export const downloadSchedules = async (post: {
  title: string;
  body: string;
}) => {
  try {
    const response = await axiosInstance.post('/schedules', post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
