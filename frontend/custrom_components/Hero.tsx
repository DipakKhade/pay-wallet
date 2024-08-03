'use client';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button'
export default function Hero(){
    return <>
    <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> <span className='text-blue-500'>Payments</span> tool for software companies</h1>
            <p className="max-w-2xl mb-6 text-gray-600 font-semibold lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">sign up to create a free Wallet</p>
           
            <GoogleButton className='rounded-sm' onClick={()=>signIn("google")} />
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://img.freepik.com/premium-vector/ewallet-concept-illustration_86047-631.jpg?w=1060" className='mix-blend-multiply dark:hidden' alt="mockup"/>
        </div>                
    </div>
</section>
    </>
}