'use client';

import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

export default function AccountDetails(){
    const [accountno, SetAccountno] =  useState<string>('')
    const [balance ,Setbalance] = useState<number>(0)
    const [lockedbalance,SetLockedbalance]=useState<number>(0)
    const [loading , SetLoading] =useState<boolean>(true)
    const cookies =useCookies();
    useEffect(()=>{
        (async()=>{
            const r=await axios.post(`${BACKEND_URL}/api/v1/user/getbalance`,{},{
                method: "POST",
                headers: {
                  authorization: cookies.get('authorization'),
                }})
            SetAccountno(r.data.account.id)
            Setbalance(r.data.account.balance)
            SetLockedbalance(r.data.account.locked)
            SetLoading(false)
        })();
    },[balance])
    console.log(accountno,balance,lockedbalance)

    if(loading){
        return <>
        loading ...
        </>
    }
    return <>
    <main className="border border-green-300">
        <div>
            {accountno}
        </div>
        <div>
            {balance}
        </div>
        <div>
            {lockedbalance}
        </div>

    </main>
    
    </>
}