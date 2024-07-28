import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SEC } from "../config";


export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers['authorization']

    const verified=jwt.verify(token as string,JWT_SEC)
   
        if(verified){
            //@ts-ignore
            req.id=verified.id
            next()
        }

   res.json({
    "Message":"unauthorized user"
   })

}