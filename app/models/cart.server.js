import { prisma } from "~/db.server";

const getCart = async (userId) => {
  const whereQuery = userId
    ? {
        where: { userId },
      }
    : {
        where: { userId: "GUESS" },
      };

  const cart = await prisma.cart.findFirst(whereQuery);
  if (!cart) {
    return [];
  }

  const cartProducts = await prisma.cartProduct.findMany({
    where: { cartId: cart.id },
  });

  const products = await prisma.product.findMany({
    where: {
      id: { in: cartProducts.map((cartProduct) => cartProduct.productId) },
    },
  });

  const getNbOccur = (id, arr) => {
    let occurs = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].productId === id) occurs++;
    }
    return occurs;
  };

  const productsList = products.map((product) => {
    const quantity = getNbOccur(product.id, cartProducts);
    return { ...product, quantity };
  });

  return productsList;
};

const addToCart = async (product, userId) => {
  let cart;
  if (userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }
  } else {
    cart = await prisma.cart.findFirst({
      where: { userId: "GUESS" },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: "GUESS",
        },
      });
    }
  }

  await prisma.cartProduct.create({
    data: {
      cartId: cart.id,
      quantity: 1,
      productId: product,
    },
  });
};

const removeCart = async (userId) => {
  const deleteUseId = userId ? userId : "GUESS";
  const cartToDelete = await prisma.cart.findFirst({
    where: { userId: deleteUseId },
  });
  await prisma.cart.delete({
    where: { id: cartToDelete.id },
  });
};

const removeFromCart = async (userId, productId) => {
  const findUserId = userId ? userId : "GUESS";

  const cart = await prisma.cart.findFirst({
    where: { userId: findUserId },
  });

  const productInCart = await prisma.cartProduct.findFirst({
    where: { cartId: cart.id, productId: productId },
  });

  await prisma.cartProduct.delete({
    where: {
      id: productInCart.id,
    },
  });
};

const quantityInCart = async (userId) => {
  const whereQuery = userId
    ? {
        where: {
          cart: {
            userId,
          },
        },
      }
    : {
        where: {
          cart: {
            userId: "GUESS",
          },
        },
      };

  return await prisma.cartProduct.count(whereQuery);
};

export { getCart, addToCart, removeFromCart, quantityInCart, removeCart };
