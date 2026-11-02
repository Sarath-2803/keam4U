import {z} from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  DB_URL: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),

  REDIS_URL: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),

  REPORT_EMAIL: z.string(),
  REPORT_EMAIL_PASSWORD: z.string(),
});

const parsed = envSchema.parse(process.env);

if(!parsed) {
  throw new Error('Invalid environment variables');
}

