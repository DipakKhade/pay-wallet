import Dashboard from "../custrom_components/Dashboard";
import SideBar from "../custrom_components/SideBar";

export default function Home() {
  return (
    <main className="flex">
      <SideBar />
      <Dashboard />
    </main>
  );
}
