import { NEXTAUTH } from "@/app/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(NEXTAUTH);

export { handler as GET, handler as POST }