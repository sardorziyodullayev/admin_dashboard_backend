import dotenv from "dotenv";
dotenv.config();

import { createApp } from './app';
import { env } from '../shared/config/env';
import { connectDB } from '../shared/config/database';
import { logger } from '../shared/logger';

export const startServer = async () => {
   await connectDB();

   const app = createApp();

   app.listen(env.PORT, () => {
      logger.info(`Backend running on port ${env.PORT}`);
   });
};