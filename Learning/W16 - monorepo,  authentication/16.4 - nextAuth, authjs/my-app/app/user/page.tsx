import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { NEXTAUTH } from "../lib/auth";

export default async function (){
    const session = await getServerSession(NEXTAUTH);
    return <div>
        <Appbar/>

        User Component 

        {JSON.stringify(session)}
    </div>
}