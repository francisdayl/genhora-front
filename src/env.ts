import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_MODE: z.enum(['development', 'production', 'test']),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
