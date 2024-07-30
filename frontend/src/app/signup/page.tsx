'use client';
import React, { useState } from "react";
import Card from "../custrom_components/Card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { BACKEND_URL } from "../../lib/config";
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "sonner";
import Image from "next/image";
import sideimage from '../../lib/images/Untitled design.png'
import Link from "next/link";
import { useRouter } from "next/navigation";
type Inputs = {
  username: string
  email: string
  password:string
}

export default function Signup() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
const router=useRouter();
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
   const res=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
    data
   })
   if(res.data.success){
    toast.success('signup successful',{
      description:'sign in to continoue'
    })
     router.push('/signin')
   }else{
    toast.error('not able to signin. try again')
   }
  }

  return (
    <>
       <div className="flex flex-wrap">
  <div className="flex w-full flex-col md:w-1/2">
   
    <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
      <p className="text-left text-3xl font-bold">Welcome to Pay-Wallet</p>
      <p className="mt-2 text-left text-gray-500">please enter your details.</p>
    
 
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8">
        <div className="flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <Input {...register('username')} type="text" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Username" />
          </div>
        </div>
        <div className="flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <Input {...register('email')} type="email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Username" />
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
          have an account?
          <Link href={'/signin'} className="underline-offset-4 font-semibold text-gray-900 underline">Sign in</Link>
        </p>
      </div>
    </div>
  </div>
  <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
   
    <img  src="https://cdn.naturettl.com/wp-content/uploads/2019/06/27085016/black-white-wildlife-photography-2-800x534.jpg?p=15203"/>
    <Image
    src={sideimage}
    alt="img"
    className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
    />
      
  </div>
</div>
    </>
  );
}

