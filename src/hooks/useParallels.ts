import { fetchSubjectParallels } from '@/api/schedules';
import { useQuery } from '@tanstack/react-query';

export const useParallels = (subjectCode: string) => {
  return useQuery({
    queryKey: ['parallels', subjectCode],
    queryFn: async (): Promise<string[]> => {
      const parallels = await fetchSubjectParallels(subjectCode);
      return parallels || [];
    },
    enabled: !!subjectCode,
  });
};
