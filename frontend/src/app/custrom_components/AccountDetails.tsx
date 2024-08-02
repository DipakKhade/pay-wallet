'use client';

import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { Card } from "@/components/ui/card";

export default function AccountDetails({update}:{update:boolean}){
    const [accountno, SetAccountno] =  useState<string>('')
    const [balance ,Setbalance] = useState<number>(0)
    const [lockedbalance,SetLockedbalance]=useState<number>(0)
    const [loading , SetLoading] =useState<boolean>(true)
    const cookies =useCookies();
    useEffect(()=>{
        (async()=>{
            let upadte
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
    },[update])
    console.log(accountno,balance,lockedbalance)

    if(loading){
        return <>
        <Card className="h-[300px] p-3 mt-4 w-[450px]">
        loading ...
        </Card>
        </>
    }
    return <>
    <Card className="h-[300px] p-3 mt-4 w-[450px] space-x-5 space-y-5">
        <p className="font-semibold text-xl">Wallet details</p>
        <div className="space-y-4 flex justify-between">
           <div>Account no : <span className="text-green-500">{accountno}</span> </div>
        </div>

        <div className="flex justify-between">
           <div>Wallet balance : <span className="text-green-500">RS {balance}</span></div> 
        </div>
        <div className="flex justify-between">
           <div>locked balance : <span className="text-green-500">RS {lockedbalance}</span></div> 
        </div>

    </Card>
    
    </>
}