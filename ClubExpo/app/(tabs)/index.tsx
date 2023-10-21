import { Redirect } from "expo-router";
import { useSession } from "../../components/ctx";

export default function Home() {
  const session = useSession();
  console.log("session: " + session?.session)
  return session?.session
   ? <Redirect href={"/series"} />
   : <Redirect href={"/sign-in"} />
}