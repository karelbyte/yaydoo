import { prisma } from "~/db.server";
import * as fs from "fs";
import cuid from "cuid";

const getProduct = async ({ id, userId }) => {
  return prisma.product.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
};

const getProductListItemsForUser = async ({ userId }) => {
  return prisma.product.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
};

const getProductListItems = async () => {
  return prisma.product.findMany();
};

const createProduct = async ({ name, img, sku, quantity, price, userId }) => {
  console.log({ name, img, sku, quantity, price, userId });

  const fileName = `/img/${cuid()}.jpg`;
  const fileNameToSave = `./public/${fileName}`;

  fs.writeFile(fileNameToSave, Buffer.from(await img.arrayBuffer()), function (err) {
    console.log(err);
  });
  return prisma.product.create({
    data: {
      name,
      img: fileName,
      sku,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const deleteProduct = async ({ id, userId }) => {
  return prisma.product.deleteMany({
    where: { id, userId },
  });
};

export {
  getProduct,
  getProductListItemsForUser,
  getProductListItems,
  createProduct,
  deleteProduct,
};
