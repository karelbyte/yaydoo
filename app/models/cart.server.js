
let cart = [];

const getCart = async () => {
  return cart;
}

const addToCartA = async (product) => {
  cart.push(product);
}

const removeFromCart = async (product) => {
  cart.splice(cart.indexOf(product), 1);
}

const quantityInCart = async () => {
  return cart.length;
}

export {
  getCart,
  addToCartA,
  removeFromCart,
  quantityInCart
}

