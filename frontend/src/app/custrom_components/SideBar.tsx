import { IoMdHome } from "react-icons/io";
import { TbTransfer } from "react-icons/tb";
import { TbTransactionDollar } from "react-icons/tb";
import { MdAccountBalanceWallet } from "react-icons/md";
import { HiMiniWallet } from "react-icons/hi2";

export default function SideBar() {
  const menu = [
    {
      name: "Home",
      icon: <IoMdHome />,
    },
    {
      name: "Add to Wallet",
      icon: <HiMiniWallet />,
    },
    {
      name: "Transfer",
      icon: <TbTransfer />,
    },
    {
      name: "Transactions",
      icon: <TbTransactionDollar />,
    },
    {
      name: "Check Balance",
      icon: <MdAccountBalanceWallet />,
    },
  ];
  return (
    <>
      <aside className="border border-l-slate-600 h-screen w-60">
        <div>
          <div className="pt-8">
            {menu.map((m, index) => (
              <div className="flex cursor-pointer p-3 space-x-2" key={index}>
                <span className="text-xl">{m.icon}</span>
                <p key={index}>{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
