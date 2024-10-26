import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    JOSE_SESSION_KEY: z.string().min(1),
    SALT_KEY: z.string().min(1),
    APP_URL: z.string().min(1),
  }
})