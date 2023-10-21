import { Redirect } from "expo-router";
import { useSession } from "../../../components/ctx";

export default function Home() {
  const session = useSession();
  return session?.session
   ? <Redirect href={"/series"} />
   : <Redirect href={"/sign-in"} />
}