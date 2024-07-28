import express ,{Express, json}from 'express';
import { PORT } from './config';
import { userRouter } from './routes/user';
import { authMiddleware } from './middlewares/auth';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app:Express=express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',userRouter);
// app.get('/api/v1/merchant',merchantRouter);






app.listen(PORT,()=>console.log(`server is up at ${PORT}`));
