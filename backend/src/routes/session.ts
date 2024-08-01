
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";

export const sessionRouter=Router();

sessionRouter.get('/validateuser',authMiddleware,(req,res)=>{
    //@ts-ignore
    console.log('user is validated',req.id)
    return res.status(200).json({
        "success":true,
        "Message":"authorized user"
       })
});

