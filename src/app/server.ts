import { createApp } from './app';
import { env } from '../shared/config/env';
import { connectDB } from '../shared/config/database';

export const startServer = async () => {
   await connectDB();

   const app = createApp();

   app.listen(env.PORT, () => {
      console.log(`Backend running on port ${env.PORT}`);
   });
};