import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <nav className="w-full h-16 p-2 bg-gray-100 dark:bg-neutral-800 mx-auto border border-neutral-200 dark:border-neutral-700">
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
