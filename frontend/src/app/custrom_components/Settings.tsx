"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useForm , SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";



export function GeneralSettings() {
  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [userid, setuserid] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/userdetails`);
        setusername(res.data.username);
        setemail(res.data.email);
        setuserid(res.data.user_id);
      } catch (e) {
        console.log(e);
      }
    })();
  });
  return (
    <>
      <main className="w-full">
        <Card className="h-[400px] w-[400px] p-6">
          <div className="space-x-reverse space-y-5">
            <div>
              <p>General setting</p>
              <label htmlFor="name">username</label>
              <Input id="name" placeholder={username} />
              <label htmlFor="email">email</label>
              <Input id="email" placeholder={email} />
              <label htmlFor="account-no">user id</label>
              <Input disabled id="user-id" placeholder={userid} />
            </div>
            <Button>save changes</Button>
          </div>
        </Card>
      </main>
    </>
  );
}

interface chnagePass{
    password:string,
    newPassword :string,
    confirmnewPassword:string
}

export function AccountSettings() {
    
  const {register,handleSubmit}=useForm();
  const cookies =useCookies();
  const onsubmit=async(data:any)=>{
    try{
        let res = await axios.post(`${BACKEND_URL}/api/v1/user/changepassword`,{
            data
        },{
            method: "POST",
            headers: {
              authorization: cookies.get('authorization'),
            }})
        if(res.data.success){
            toast(res.data['message'])
        }
        if(!res.data['success']){
            toast(res.data['message'])
        }
        return
    }catch(e){

    }
  }


  return (
    <>
      <main className="">
        <div className="p-4">
          <form className="space-y-2" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <Input type="password" {...register("password")} placeholder="currnet password" />
            </div>
            <div>
              <Input type="password" {...register("newPassword")} placeholder="new password" />
            </div>
            <div>
              <Input type="password" {...register("confirmnewPassword")} placeholder="confirm new password" />
            </div>
            <Button type="submit">save changes</Button>
          </form>
        </div>
      </main>
    </>
  );
}
