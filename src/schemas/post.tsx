import { z } from 'zod';

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

export type Post = z.infer<typeof postSchema>;
