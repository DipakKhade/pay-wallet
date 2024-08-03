'use client';
import { SideMenu } from "../../../../custrom_components/SideMenu";
import { AccountSettings, GeneralSettings } from "../../../../custrom_components/Settings";
import { useState } from "react";

enum Tab{
    General,
    Account
}
export default function Page(){
    const [activeTab, SetActiveTab] = useState<Tab>(Tab.General)

    return <>
<SideMenu>
<div className="flex space-x-6 font-semibold text-xl cursor-pointer pt-12">
    <p className={`${activeTab==Tab.General ? 'text-green-400':''}`} onClick={()=>SetActiveTab(Tab.General)}>General settings</p>
    <p className={`${activeTab==Tab.Account ? 'text-green-400':''}`} onClick={()=>SetActiveTab(Tab.Account)}>Account settings</p>
</div>

{activeTab== Tab.General ? <GeneralSettings/> :<AccountSettings/>}

</SideMenu>
    </>
}