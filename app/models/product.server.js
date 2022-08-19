import { prisma } from "~/db.server";

export function getProduct({ id, userId }) {
  return prisma.product.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getProductListItems({ userId }) {
  return prisma.poduct.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createProduct({ name, img, sku, quantity, price, userId }) {
  return prisma.product.create({
    data: {
      name,
      img,
      sku,
      quantity,
      price,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteProduct({ id, userId }) {
  return prisma.product.deleteMany({
    where: { id, userId },
  });
}
