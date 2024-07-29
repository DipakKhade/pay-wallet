import { ReactNode } from "react";

export default function Card({children}:{children:ReactNode}){
    return<>
    <div className="w-80 h-96 border border-gray-600 rounded-sm">
        {children}
    </div>
    </>
}