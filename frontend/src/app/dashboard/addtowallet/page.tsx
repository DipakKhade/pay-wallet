'use client';
import { Card } from "@/components/ui/card";
import SideBar from "../../custrom_components/SideBar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useCookies } from "next-client-cookies";
import { useForm , SubmitHandler } from "react-hook-form";
enum Bank{
    hdfc,
    axis,
    union,
    state
}
type Inputs={
  amount:number,
  bank:Bank
}
export default function Page() {
    const cookies = useCookies();
    const {register , handleSubmit}=useForm<Inputs>()
    async function onramp(data:any){
      console.log(data)
        const res=await axios.post(`${BACKEND_URL}/api/v1/user/onramp`,{data},{
          method: "POST",
          headers: {
            authorization: cookies.get('authorization'),
          },
        })
        console.log(res)
    } 
  return (
    <>
      <main className="flex">
        <SideBar />
        <div className="justify-center p-4">
          <Card className="w-96 h-[300px] space-y-3 p-3">
            <p>Add to Wallet</p>
            <form onSubmit={handleSubmit(onramp)}>

            <div className="space-y-2">
            <Input {...register('amount')} type="number" placeholder="amount" />

            <Select>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel {...register('bank')}>Bank</SelectLabel>
                  <SelectItem value="hdfc">HDFC</SelectItem>
                  <SelectItem value="axis">Axis</SelectItem>
                  <SelectItem value="union">Union</SelectItem>
                  <SelectItem value="state">state</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        <Button className="m-auto justify-center align-middle">Add money</Button>
            </div>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}
