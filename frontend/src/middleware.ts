import { BACKEND_URL } from "./lib/config";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { useSession } from "next-auth/react"

export async function middleware(req:NextRequest,event:NextFetchEvent){
    // const { pathname } = req.nextUrl
    // const authToken=cookies().get('authorization')
    // const url = req.nextUrl.clone()
    // url.pathname = '/signin'
    // if(!authToken?.value){
    //     return NextResponse.rewrite(url)
    // }

    // event.waitUntil(
    //     fetch(`${BACKEND_URL}/api/v1/validateuser`,{
    //         method:'GET',
    //         //@ts-ignore
    //    headers:{
    //     'authorization':authToken?.value
    //    }
    //    }).then(r=>r.json()).then((rs)=>{
    //     if(rs.success){
    //         return NextResponse.rewrite(url)
    //     }
    //         return NextResponse.redirect('/signin')
        
    // }
    // )
    // )

    // console.log('server session is ' , session)

    return ;
    
}

export const config = {
    // matcher: '/dashboard/:path*',
    matcher:'/'
  }