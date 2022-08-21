
import {  removeFromCart } from "~/models/cart.server";
import { getUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

export async function action({ request }) {
  const form = await request.formData();
  const productId = form.get("productId");
  const userId = await getUserId(request);
  await  removeFromCart(userId, productId);
  return redirect('/cart')
}


export default function DeleteCart() {}