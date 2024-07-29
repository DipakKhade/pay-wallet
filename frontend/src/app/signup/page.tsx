'use client';
import React, { useState } from "react";
import Card from "../custrom_components/Card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { BACKEND_URL } from "../../lib/config";
import axios from 'axios';
import { cookies } from "next/headers";


export default function Signup() {
    const [username , setUsername] = useState<string>('')
    const [email , setEmail] = useState<string>('')
    const [password , setPassword] =  useState<string>('')

    async function handleSubmit(){
        console.log(username,email,password)
        const res=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
            username, email , password
        })
        const token =res.data['token']
        console.log(token)
        return;
    }
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <Card>
          <p className="text-2xl font-bold pl-24 pb-12">Sign up</p>

          <div className="p-2 space-y-4">
            <div className="space-y-2">
              <Input onClick={(e)=>setUsername(e.target.value)} placeholder="username" />
              <Input onClick={(e)=>setEmail(e.target.value)} placeholder="email" />
              <Input onClick={(e)=>setPassword(e.target.value)} placeholder="password" />
            </div>

            <Button type="submit" onClick={()=>handleSubmit()}>Sign Up</Button>
          </div>
        </Card>
      </main>
    </>
  );
}
