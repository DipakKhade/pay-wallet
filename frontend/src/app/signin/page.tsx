'use client';
import { Input } from "@/components/ui/input"
import { BACKEND_URL } from "@/lib/config"
import axios from 'axios';
import { useForm , SubmitHandler } from "react-hook-form";
import { useCookies } from 'next-client-cookies';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from 'sonner'

type Inputs = {
  username: string
  password:string
}

export default function Signin(){
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const cookies = useCookies();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    
   const res=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
    data
   })
   if(res.data.success){
    cookies.set('authorization',res.data.token)
    toast.success('sign in successful')
   router.push('/')
   }else{
    toast.error('try again')
   }
   
  }

    return <>
    <div className="flex flex-wrap">
  <div className="flex w-full flex-col md:w-1/2">
    <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
      <p className="text-left text-3xl font-bold">Welcome to Pay-Wallet</p>
      <p className="mt-2 text-left text-gray-500">please enter your details.</p>
    
 
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8">
        <div className="flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <Input {...register('username')}className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Username" />
          </div>
        </div>
        <div className="mb-12 flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <Input {...register('password')} type="password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" />
          </div>
        </div>
        <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">Log in</button>
      </form>
      <div className="py-12 text-center">
        <p className="whitespace-nowrap text-gray-600">
          Dont have an account?
          <a href="#" className="underline-offset-4 font-semibold text-gray-900 underline">Sign up for free.</a>
        </p>
      </div>
    </div>
  </div>
  <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
   
    <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
  </div>
</div>

    </>

}