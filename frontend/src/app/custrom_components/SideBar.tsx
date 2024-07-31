'use client';
import { IoMdHome } from "react-icons/io";
import { TbTransfer } from "react-icons/tb";
import { TbTransactionDollar } from "react-icons/tb";
import { MdAccountBalanceWallet } from "react-icons/md";
import { HiMiniWallet } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


export default function SideBar() {
  const path=usePathname();
  const router = useRouter();
  console.log(path)
  const menu = [
    {
      name: "Home",
      pathname:'/dashboard',
      page:'/',
      icon: <IoMdHome />,
    },
    {
      name: "Add to Wallet",
      pathname:'/dashboard/addtowallet',
      page:'/dashboard/addtowallet',
      icon: <HiMiniWallet />,
    },
    {
      name: "Transfer",
      pathname:'/dashboard/transfer',
      page:'/transfer',
      icon: <TbTransfer />,
    },
    {
      name: "Transactions",
      pathname:'/dashboard/transactions',
      page:'/transactions',
      icon: <TbTransactionDollar />,
    },
    {
      name: "Check Balance",
      pathname:'/dashboard/checkbalance',
      page:'/checkbalance',
      icon: <MdAccountBalanceWallet />,
    },
  ];
  return (
    <>
      <aside className="border border-l-slate-600 h-screen w-60">
        <div>
          <div className="pt-8">
            {menu.map((m, index) => (
              <div className={`p-3 space-x-2 ${m.pathname==path ? 'text-green-500' : ''}`} key={index}>
                <button className="flex cursor-pointer" onClick={()=>router.push(m.page)}>
                <span className="text-xl">{m.icon}</span>
                <p key={index}>{m.name}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
