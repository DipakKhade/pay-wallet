'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react"

export function GeneralSettings(){
    const [username ,setusername] = useState<string>('')
    const [email , setemail] = useState<string>('')
    const [userid , setuserid] = useState<string>('')

    useEffect(()=>{
        (async()=>{
            try{                
                const res=await axios.post(`${BACKEND_URL}/api/v1/user/userdetails`)
                setusername(res.data.username)
                setemail(res.data.email)
                setuserid(res.data.user_id)
                console.log(res)
            }catch(e){
                console.log(e)
            }

        })();
    })
    return <>
    <div> 
        <div>
        <p>General setting</p>
        <label htmlFor="name">username</label>
        <Input id="name" placeholder={username}/>
        <label htmlFor="email">email</label>
        <Input id="email" placeholder={email} />
        <label htmlFor="account-no">user id</label>
        <Input disabled id="user-id" placeholder={userid} />
        <Button>save changes</Button>
        </div>
    </div>
    </>
}