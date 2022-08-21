
import { removeCart } from "~/models/cart.server";
import { getUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

export async function action({ request }) {
  const userId = await getUserId(request);
  await removeCart(userId);
  return redirect('/cart')
}


export default function DeleteCart() {}