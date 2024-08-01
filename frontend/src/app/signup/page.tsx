"use client";
import React, { useState } from "react";
import Card from "../custrom_components/Card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { BACKEND_URL } from "../../lib/config";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import sideimage from "../../lib/images/Untitled design.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, SetLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    SetLoading(true);
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      data,
    });
    if (res.data.success) {
      SetLoading(false);
      toast.success("signup successful", {
        description: "sign in to continoue",
      });
      router.push("/signin");
    } else {
      SetLoading(false);
      toast.error("not able to signin. try again");
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p className="text-left text-3xl font-bold">
              Welcome to Pay-Wallet
            </p>
            <p className="mt-2 text-left text-gray-500">
              please enter your details.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <Input
                    {...register("username")}
                    type="text"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <Input
                    {...register("email")}
                    type="email"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="email"
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <Input
                    {...register("password")}
                    type="password"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
              >
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </>
                ) : (
                  <span>sign up</span>
                )}
              </button>
            </form>
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600">
                have an account?
                <Link
                  href={"/signin"}
                  className="underline-offset-4 font-semibold text-gray-900 underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <img
            alt="img"
            className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
            src="https://cdn.naturettl.com/wp-content/uploads/2019/06/27085016/black-white-wildlife-photography-2-800x534.jpg?p=15203"
          />
        </div>
      </div>
    </>
  );
}
