import { Router } from "express";
import { db, JWT_MERCHANT_SEC } from "../config";
import jwt from 'jsonwebtoken';

export const merchantRouter=Router()

merchantRouter.get('/signup',async(req,res)=>{
    const {merchantname,email,password}=req.body

    try{

        db.$transaction(async tx=>{
            const new_merchant=await tx.merchant.create({
                data:{
                    username:merchantname,
                    email,
                    password
                }
            })
            
           const merchant_account=await tx.merchantAccount.create({
                data:{
                    merchantid:new_merchant.id
                }
            })
            console.log(new_merchant,merchant_account)
        })



        return res.status(200).json({
            "message":"signup successful"
        })
        
    }catch(e){
        console.log(e)
       return res.status(400).send({
            "message":"fail to signup"
        })
    }

})


merchantRouter.get('/signin',async(req,res)=>{
    const {merchantname,password}=req.body

    const merchant=await db.merchant.findFirst({
        where:{
            username:merchantname,
            password:password
        }
    })

    if(!merchant){
        res.status(400).json({
            "message":"merchant not found"
        })
    }

    const token = jwt.sign({
        id:merchant?.id
    },JWT_MERCHANT_SEC)

    res.status(200).json({
        token
    })
})