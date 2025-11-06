import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany(); // deletes if any data exits
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();


  await prisma.product.createMany({ data: sampleData.products }); // creates new data
  await prisma.user.createMany({ data: sampleData.users });

  console.log('Database seeded successfully!');
}

// call main
main();