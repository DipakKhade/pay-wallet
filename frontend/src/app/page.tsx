import { authOptions } from "./api/auth/[...nextauth]/route";
import Hero from "../../custrom_components/Hero";
import { getServerSession } from 'next-auth';
import Dashboard from "../../custrom_components/Dashboard";

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};


export default async function Home() {
  const session = await getUserDetails();
  console.log('asd',session)
  if(session){
    return<>
    asd
    </>
  }

  return (
    <>
      <main>
        <Dashboard />
      </main>
    </>
  );
}
