
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";

export const sessionRouter=Router();

sessionRouter.get('/validateuser',authMiddleware,(req,res)=>{
    console.log('use is validated')
    return res.status(200).json({
        "success":true,
        "Message":"authorized user"
       })
});

