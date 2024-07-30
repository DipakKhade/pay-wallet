import { Router } from "express";
import jwt from 'jsonwebtoken';
import { db, JWT_USER_SEC, SALT_ROUNDS } from "../config";
import { authMiddleware } from "../middlewares/auth";
export const userRouter=Router();

userRouter.post('/signup',async(req,res)=>{
    const {username , email , password}=req.body.data
    console.log(username,email,password)
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
        "success":true,
        "message":"signup successfully"
       })
      
    }catch(e){

        console.log('error in signup',e)
      return  res.json({
        "success":false,
            "message":"signup failed"
        })
    }    
})


userRouter.post('/signin',async(req,res)=>{
    const {username ,password}=req.body.data
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
            "success":true,
            token
        })
    }

   return res.status(401).json({
        "message":"user not found"
    })

})


userRouter.post('/onramp',authMiddleware,async(req,res)=>{
    //add amount to wallet  , this will hiat by a bank/rezorpay
    const {amount}=req.body.data
    //@ts-ignore
    const id =req.id
    console.log(amount,id)
    try{
        console.log('control is in try')
       const onramp= await db.userAccount.update({
            where:{
                userid:id
            },
            data:{
                balance:{
                    increment:Number(amount)
                }
            }
        })
        console.log('onramp',onramp)
        return res.status(200).json({
            "success":true,
            "message":`onramp of RS ${amount} is done`
        })
    }catch(e){
        console.log('control is in catch')
        return res.status(400).json({
            "success":false,
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
      }
)
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


userRouter.post('/getbalance',async(req,res)=>{
    //@ts-ignore
    const userid=req.id
    const user_account=await db.userAccount.findFirst({
        where:{
            userid
        }
    })
    if(!user_account){
        return res.status(404).json({
            "message":"unable to fetch account details"
        })
    }
    const wallet_balance=user_account?.balance || 0
    return res.status(200).json({
        "message":`wallet balance : ${wallet_balance}`
    })
})

