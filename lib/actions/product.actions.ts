import { prisma } from "@/db/primsa";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

// 1. GET/ the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {createdAt: "desc" },
  });

  // convert decimal to number
  const converteDecimal = data.map((p) => ({
    ...p,
    price: Number(p.price),
    rating: Number(p.rating),
  }));

  return convertToPlainObject(converteDecimal);
};


// GET/ product by slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug }
  });

  if (!product) return null;

  return convertToPlainObject({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  });
};