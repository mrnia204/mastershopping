'user client'
import { prisma } from "@/db/primsa";
//import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export async function getLatestProducts() {
  //const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT, 
    orderBy: { createdAt: "desc"},
  });

  return convertToPlainObject(data);
}


// Get single Product by its slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {slug},
  });

  if (!product) return null;

  return {
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }
}