import express from 'express';
import cors from 'cors';

export const createApp = () => {
   const app = express();

   app.use(cors());
   app.use(express.json());

   app.get('/', (_, res) => {
      res.json({ status: "OK" });
   });

   return app;
};