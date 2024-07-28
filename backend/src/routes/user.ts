import { Router } from "express";
import jwt from 'jsonwebtoken';
import { db, JWT_USER_SEC } from "../config";
import { authMiddleware } from "../middlewares/auth";

export const userRouter=Router();

userRouter.post('/signup',async(req,res)=>{
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


userRouter.post('/signin',async(req,res)=>{
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


userRouter.post('/onramp',authMiddleware,async(req,res)=>{
    //add amount to wallet
    const {amount}=req.body
    //@ts-ignore
    const id =req.id
    console.log(amount,id)
    try{

       const onramp= await db.userAccount.update({
            where:{
                userid:id
            },
            data:{
                balance:{
                    increment:amount
                }
            }
        })
        console.log(onramp)
        return res.status(200).json({
            "message":`onramp of RS ${amount} is done`
        })
    }catch(e){
        return res.status(400).json({
            "message":"onramp failed"
        })
    }


})


userRouter.post('/transfer',authMiddleware,async(req,res)=>{
    //@ts-ignore
    const userid=req.id
    const {merchant_account_id,amount}=req.body
    
    const paymentDone=await db.$transaction(async tx=>{
        //locking the row
        console.log(userid)
        await tx.$queryRaw`SELECT * FROM "UserAccount" WHERE "userid"=${userid} FOR UPDATE`

        try{

            //check user balance > amount user trying to send
            const user_account=await tx.userAccount.findFirst({
                where:{
                    userid
                }
            })
            
            if(user_account?.balance as number <amount){
                return false
            }

            const sender=await tx.userAccount.update({
                where:{
                    userid
                },
                data:{
                    balance:{
                        decrement:amount
                    }
                }
            })
            const receiverMerchant=await tx.merchantAccount.update({
                where:{
                    id:merchant_account_id
                },
                data:{
                    balance:{
                        increment:amount
                    }
                }
            })  
            
         return true

        }catch(e){
            console.log(e)
        }
    },
    {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
        // isolationLevel: db.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      }
)
    
console.log(paymentDone)
    if(paymentDone){
        return res.status(200).json({
            "message":`payment done : RS ${amount}`
        })
    }else{
        return res.status(400).json({
            "message":"payment failed"
        })
    }

   
})