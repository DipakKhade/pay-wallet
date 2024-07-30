import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_SEC } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  const token = req.headers["authorization"];
  console.log('token',token)
  if (!token) {
    return res.json({
      Message: "unauthorized user",
    });
  }
  const verified = jwt.verify(token as string, JWT_USER_SEC);
  console.log('varified',verified);
  if (verified) {
    //@ts-ignore
    req.id = verified.id;
    next();
  } else {
    return res.json({
      success: false,
      Message: "unauthorized user",
    });
  }
};
