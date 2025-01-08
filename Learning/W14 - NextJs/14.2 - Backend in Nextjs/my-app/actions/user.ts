"use server"

import { prisma } from "@/lib/prisma"

export const sendRequest = async(username:string, password:string) => {
      try{
         const user = await prisma.user.create({
            data:{
                username,
                password
            }
        })  
        return true;

      }catch(e){
         console.log(e)
         return false;
      }
   }