import express from 'express';
import cors from 'cors';
import authRoutes from "../modules/auth/api/auth.routes"
import { errorMiddleware } from '../shared/middleware/error.middleware';

export const createApp = () => {
   const app = express();

   app.use(cors());
   app.use(express.json());

   app.use("/api/auth", authRoutes);

   app.get('/', (_, res) => {
      res.json({ status: "OK" });
   });

   app.get("/test", (req, res) => {
      res.send("OK");
   });




   app.use(errorMiddleware);

   return app;
};