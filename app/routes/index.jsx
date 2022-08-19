import { useLoaderData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import ProductCard from "~/components/productCard";
import NavBar from "~/components/navBar";
import { getProductListItems } from "~/models/product.server";
import { quantityInCart} from "~/models/cart.server";
import { json } from "@remix-run/node";

export async function loader({ request, params }) {
  const products = await getProductListItems();
  if (!products) {
    throw new Response("Products not found :(", { status: 404 });
  }
  const itemsInCart = await quantityInCart();
  return json({ products,  itemsInCart });
}

export default function Index() {
  const user = useOptionalUser();
  const { products, itemsInCart } = useLoaderData();

  return (
    <main>
      <NavBar itemsQuantity={itemsInCart} user={user} />
      {itemsInCart}
      <div className="pt-20 flex w-full justify-center items-center">
        <div
          className="grid xs:w-full xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 md:w-full lg:grid-cols-4 lg:w-9/12 justify-items-center gap-5 "
        >
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
