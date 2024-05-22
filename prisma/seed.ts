import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  // insert data here
];

async function main() {
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    // console.log(`Created user with id: ${user.id}`);
  }
  // console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });
