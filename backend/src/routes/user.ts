import { Router } from "express";
import jwt from 'jsonwebtoken';
import { db, JWT_USER_SEC } from "../config";


export const userRouter=Router();

userRouter.get('/signup',async(req,res)=>{
    const {username , email , password}=req.body
    const token=jwt.sign({username,email,password},JWT_USER_SEC)

    try{
       const new_user= db.$transaction(async function(tx){
        const new_user=await tx.user.create({
            data:{
                username, 
                email,
                password
            }
        })

        const user_account=await tx.userAccount.create({
            data:{
                userid:new_user.id
            }
        })
       })

      return res.json({
        "message":"signup successfully"
       })
      
    }catch(e){

        console.log('error in signup',e)
      return  res.json({
            "message":"signup failed"
        })
    }    
})


userRouter.get('/signin',async(req,res)=>{
    const {username ,password}=req.body
    console.log(username,password)
    const user=await db.user.findFirst({
        where:{
            username:username,
            password:password
        }
    })
    console.log(user)
    if(user){
        const token=jwt.sign({
            id:user.id
        },JWT_USER_SEC)

       return res.json({
            token
        })
    }

   return res.status(401).json({
        "message":"user not found"
    })

})


