import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import db from "@/db";

export const authOptions ={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),  
    ],
    
    callbacks:{
            async signIn({ user, account, profile, email, credentials }:{ user:any, account:any, profile:any, email:any, credentials:any }) {
                    console.log({ user, account, profile, email, credentials })
                    if(account.provider!=='google'){
                        return false
                    }

                    const user_db = await db.user.findFirst({
                        where:{
                            email
                        }
                    })

                    if(user_db){
                        return true
                    }

                    const create_user_wallet = db.$transaction(async tx=>{
                        const new_user=await tx.user.create({
                            data:{
                                username:user.name,
                                email:user.email,
                                profilePicture:user.image
                            }
                        })

                        await tx.userAccount.create({
                            data:{
                                userid:new_user.id
                            }
                        })
                        return true
                    })
          },
    }
    
}


//@ts-ignore
const handler= NextAuth(authOptions)
export {handler as GET , handler as POST}