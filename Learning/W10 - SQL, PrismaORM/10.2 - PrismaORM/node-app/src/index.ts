import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      firstName: 'Jane Doe',
      email: 'jane.doe@example.com',
      password : "abc"
    },
  });

  console.log('Created User:', newUser);

  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('All Users:', users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());