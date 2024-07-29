import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <nav className="w-full h-16 border border-slate-600 p-2">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-semibold">Pay-Wallet</p>
          </div>
          <div>
            <Button>sign out</Button>
          </div>
        </div>
      </nav>
    </>
  );
}
