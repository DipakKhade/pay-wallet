import { ReactNode } from "react";

export function MaxWithWrapper({children}:{children:ReactNode}){
    return <>
    <div className="max-w-7xl">
{children}
    </div>
    </>
}