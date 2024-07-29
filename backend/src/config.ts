import { PrismaClient } from "@prisma/client";
export const db=new PrismaClient()

export const JWT_USER_SEC:string=process.env.JWT_USER_PASS || 'abcdabcd'
export const JWT_MERCHANT_SEC:string=process.env.JWT_MER_PASS || 'abcdab'


export const PORT:number=process.env.PORT as unknown as number || 3000

export const SALT_ROUNDS=10
