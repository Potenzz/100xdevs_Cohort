import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

export default {
  async fetch(request:any, env:any, ctx:any) {
    const pool = new Pool({ connectionString: env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com"
      }
    });

    const users = await prisma.user.findMany();

    // Send back the list of users as a JSON response
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
}

