
import { deleteProduct } from "~/models/product.server";
import { redirect } from "@remix-run/node";

export async function action({ request }) {
  const form = await request.formData();
  const idToDelete = form.get("productId");
  await  deleteProduct({idToDelete});
  return redirect('/product/inventory');
}


export default function DeleteCart() {}