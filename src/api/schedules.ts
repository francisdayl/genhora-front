import { env } from '@/env';
import { GenHoraPayload } from '@/types';
import axios, { AxiosInstance } from 'axios';

const API_URL = env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const axiosDownloadClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  responseType: 'blob',
  headers: {
    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
});

export const fetchSubjects = async (): Promise<Record<string, string>> => {
  const response = await axiosInstance.get('/subjects');
  return response.data;
};

export const fetchSubjectParallels = async (subjectCode: string) => {
  const response = await axiosInstance.get(`/paralels/${subjectCode}`);
  return response.data;
};

export const downloadSchedules = async (data: GenHoraPayload) => {
  try {
    const response = await axiosDownloadClient.post('/schedules', data);
    return response.data;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response
    ) {
      const axiosError = error as {
        response: {
          data: unknown;
        };
      };

      if (axiosError.response.data instanceof Blob) {
        try {
          const errorText = await axiosError.response.data.text();
          const errorData = JSON.parse(errorText) as { detail?: string };
          throw new Error(errorData.detail || 'Unknown error occurred');
        } catch (parseError) {
          throw new Error('Failed to parse error response');
        }
      }
    }

    throw new Error('Failed to download schedules');
  }
};
