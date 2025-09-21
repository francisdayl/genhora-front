import { useQuery } from '@tanstack/react-query';
import { Subject } from '../types';
import { fetchSubjects } from '@/api/schedules';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async (): Promise<Subject[]> => {
      const subjects: Record<string, string> = await fetchSubjects();
      return Object.entries(subjects).map(([code, name]) => ({
        code,
        name,
      }));
    },
  });
};
