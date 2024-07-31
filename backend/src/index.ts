import express ,{Express,Request,Response,NextFunction}from 'express';
import { PORT } from './config';
import { userRouter } from './routes/user';
import { authMiddleware } from './middlewares/auth';
import cors from 'cors';
import dotenv from 'dotenv';
import { merchantRouter } from './routes/merchant';
import { sessionRouter } from './routes/session';
dotenv.config();

const app:Express=express();

app.use(express.json());
app.use(cors());


app.use('/api/v1/user',userRouter);
app.use('/api/v1/merchant',merchantRouter);
app.use('/api/v1',sessionRouter)



app.use((err:ErrorEvent,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
    res.status(500).send('sommething went wrong')
})


app.listen(PORT,()=>console.log(`server is up at ${PORT}`));
