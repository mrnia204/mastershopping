import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany(); // deletes if any data exits

  await prisma.product.createMany({ data: sampleData.products }); // creates new data

  console.log('Database seed successfully!');
}

// call main
main();