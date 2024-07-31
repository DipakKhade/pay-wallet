'use client';

import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { Card } from "@/components/ui/card";

export default function AccountDetails(){
    const [accountno, SetAccountno] =  useState<string>('')
    const [balance ,Setbalance] = useState<number>(0)
    const [lockedbalance,SetLockedbalance]=useState<number>(0)
    const [loading , SetLoading] =useState<boolean>(true)
    const cookies =useCookies();
    useEffect(()=>{
        (async()=>{
            try{
                const r=await axios.post(`${BACKEND_URL}/api/v1/user/getbalance`,{},{
                    method: "POST",
                    headers: {
                      authorization: cookies.get('authorization'),
                    }})
                SetAccountno(r.data.account.id)
                Setbalance(r.data.account.balance)
                SetLockedbalance(r.data.account.locked)
                SetLoading(false)
            }catch(e){

                SetLoading(false)
            }
        })();
    },[balance])
    console.log(accountno,balance,lockedbalance)

    if(loading){
        return <>
        loading ...
        </>
    }
    return <>
    <Card className="h-[300px] p-3 mt-4 w-[600px]">
        <p className="font-semibold text-xl">Wallet details</p>
        <div className="space-y-4 flex justify-between">
           <div>Account no :</div> {accountno}
        </div>

        <div className="flex justify-between">
           <div>Wallet balance :</div> RS {balance}
        </div>
        <div className="flex justify-between">
           <div>locked balance :</div> RS {lockedbalance}
        </div>

    </Card>
    
    </>
}