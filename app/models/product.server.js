import { prisma } from "~/db.server";
import * as fs from "fs";
import cuid from "cuid";

const getProductListItemsForUser = async ({ users }) => {
  if (Array.isArray(users)) {
    const uniques = users.filter((v, i, a) => a.indexOf(v) === i);
    return prisma.product.findMany({
      where: {
        user: {
          id: { in: uniques },
        },
      },
    });
  }
  return prisma.product.findMany({
    where: {
      user: {
        id: users,
      },
    },
    orderBy: { updatedAt: "desc" },
  });
};

const getProductListItems = async (term, price) => {
  if (term) {
    return prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          { sku: { contains: term } },
          { price}
        ],
      },
    });
  }

  if (price) {
    return prisma.product.findMany({
      where: {
        price: {
          lte: price,
        },
      },
    });
  }

  return prisma.product.findMany();
};

const createProduct = async ({ name, img, sku, quantity, price, userId }) => {
  const fileName = `/img/${cuid()}.jpg`;
  const fileNameToSave = `./public/${fileName}`;

  fs.writeFile(
    fileNameToSave,
    Buffer.from(await img.arrayBuffer()),
    function (err) {
      console.log(err);
    }
  );
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

const deleteProduct = async ({ idToDelete }) => {
  return prisma.product.delete({
    where: { id: idToDelete },
  });
};

export {
  getProductListItemsForUser,
  getProductListItems,
  createProduct,
  deleteProduct,
};
