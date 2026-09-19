import Homepage from "../Homepage";
import { cookies } from "next/headers";



export default async function CustomerUserPage() {

  const userName = (await cookies()).get("userName")?.value ?? "";
  return <Homepage userName={userName} />;
}
