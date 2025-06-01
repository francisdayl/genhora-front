import { env } from '@/env';
import { GenHoraPayload } from '@/types';
import axios from 'axios';

const API_URL = env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const axiosDownloadClient = axios.create({
  baseURL: API_URL,
  responseType: 'blob',
  headers: {
    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
});

export const fetchSubjects = async (): Promise<Record<string, string>> => {
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
    const response = await axiosInstance.get(`/paralels/${subjectCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subject paralles:', error);
    throw error;
  }
};

export const downloadSchedules = async (data: GenHoraPayload) => {
  try {
    const response = await axiosDownloadClient.post('/schedules', data);
    return response.data;
  } catch (error) {
    console.error('Error while creating the schedules:', error);
    throw error;
  }
};
