import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useOptionalUser } from "~/utils";
import { quantityInCart, getCart } from "~/models/cart.server";
import NavBar from "~/components/navBar";
import { getUserId } from "~/session.server";

export async function loader({ request, params }) {
  const userId = await getUserId(request);
  const products = await getCart(userId);
  if (!products) {
    throw new Response("Products not found :(", { status: 404 });
  }
  const itemsInCart = await quantityInCart(userId);
  return json({ products, itemsInCart });
}

export default function Index() {
  const user = useOptionalUser();
  const { products } = useLoaderData();
  const priceTotal = products
    .reduce(
      (carry, product) => carry + parseFloat(product.price) * product.quantity,
      0
    )
    .toFixed(2);
  const quantity = products.reduce(
    (carry, product) => carry + product.quantity,
    0
  );
  return (
    <main>
      <NavBar user={user} />
      <div className="flex w-full flex-col items-center justify-center ">
        <div className="flex w-9/12 justify-between">
          <h2 className="mt-24 text-xl">LIST OF PRODUCT DO YOU WANT TO BUY</h2>
          <Form
            className="mt-24 cursor-pointer text-blue-600 underline"
            method="post"
            action="delete-cart"
          >
            <button type="submit"> Clear cart</button>
          </Form>
        </div>

        <div className="grid w-9/12 grid-cols-3 gap-5 pt-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative flex items-center rounded-lg border border-slate-400 bg-white shadow-md"
            >
              <Form method="post" action="delete-cart-product">
                <button
                  type="submit"
                  className="absolute left-[430px] top-[70px]"
                >
                  <input type="hidden" name="productId" value={product.id} />
                  <svg
                    className="h-6 w-6 cursor-pointer"
                    fill="red"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </Form>
              <img className="ml-2 w-24" src={product.img} alt="Shoe" />
              <div className="w-full px-5 pb-5">
                <div className="flex justify-between">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {product.name}
                  </h5>
                  <h5 className="tracking-tight text-gray-900 dark:text-white">
                    Sku: <b>{product.sku}</b>
                  </h5>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <h5 className="tracking-tight dark:text-white">
                    Quantity:{" "}
                    <b className=" text-indigo-900">{product.quantity}</b>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-9/12 flex-col items-end">
          <div className="mt-10 w-full  border-2 border-cyan-800"></div>
          <h2 className="mt-4">
            Quantity: <span className="ml-5 font-extrabold">{quantity}</span>
          </h2>
          <h2 className="mt-4">
            Total: <span className="ml-5 font-extrabold">${priceTotal}</span>
          </h2>
        </div>
      </div>
    </main>
  );
}
