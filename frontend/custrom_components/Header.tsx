'use client';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemeToggle";
import { useSession ,signIn, signOut} from "next-auth/react"


export default  function Header() {
  const session = useSession();
  return (
    <>
      <nav className="h-16 p-2 bg-gray-100 dark:bg-neutral-800 mx-auto border border-neutral-200 dark:border-neutral-700 rounded-sm">
        <div className="flex justify-between pt-1 align-middle">
          <div>
            <p className="text-xl font-semibold">Pay-Wallet</p>
          </div>
          <div className="space-x-4 pt-0 flex align-middle">
            <span className="inline-flex">
            <ModeToggle/>
            </span>
            <span className="pb-0 inline-flex">
              {
                session.data?.user ?  <Button onClick={()=>signOut()}>sign out</Button> :  <Button onClick={()=>signIn("google")}>sign in</Button>
              }
           
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
