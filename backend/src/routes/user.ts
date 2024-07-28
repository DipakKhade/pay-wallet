import { Router } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SEC } from "../config";
import { PrismaClient } from "@prisma/client";

export const userRouter=Router();
const db=new PrismaClient()

userRouter.get('/signup',async(req,res)=>{
    const {username , email , password}=req.body
    const token=jwt.sign({username,email,password},JWT_SEC)

    try{
       const new_user= await db.user.create({
            data:{
                username , email ,password
            }
        })
        console.log(new_user)
        res.json({
            token
        })
      
    }catch(e){

        console.log('error in signup',e)
        res.json({
            "message":"signup failed"
        })
    }


    
})
// userRouter.get('/signin')


