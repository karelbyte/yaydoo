import { json, redirect } from "@remix-run/node";
import { Link, Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createProduct } from "~/models/product.server";
import { requireUserId } from "~/session.server";

export async function action({ request }) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const img = formData.get("img");
  const sku = formData.get("sku");
  const quantity = formData.get("quantity");
  const price = formData.get("price");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      {
        errors: {
          name: "Name is required",
          sky: null,
          quantity: null,
          price: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof sku !== "string" || sku.length === 0) {
    return json(
      {
        errors: {
          sku: "Sku is required",
          name: null,
          quantity: null,
          price: null,
        },
      },
      { status: 400 }
    );
  }

  if (isNaN(quantity) || quantity.length === 0) {
    return json(
      {
        errors: {
          quantity: "Quantity is required or not are a number",
          name: null,
          sku: null,
          price: null,
        },
      },
      { status: 400 }
    );
  }

  if (isNaN(price) || price.length === 0) {
    return json(
      {
        errors: {
          price: "Quantity is required or not are a number",
          name: null,
          sku: null,
          quantity: null,
        },
      },
      { status: 400 }
    );
  }

  createProduct({ name, img, sku, quantity, price, userId });

  return redirect(`/product/inventory`);
}

export default function NewProductPage() {
  const actionData = useActionData();
  const nameRef = React.useRef(null);
  const skuRef = React.useRef(null);
  const quantityRef = React.useRef(null);
  const priceRef = React.useRef(null);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.sku) {
      skuRef.current?.focus();
    }
  }, [actionData]);

  const setSelectedImage = (e) => {
    imgRef.current = e;
    const reader = new FileReader();
    reader.onload = function () {
      const output = document.getElementById("output");
      output.src = reader.result;
    };
    reader.readAsDataURL(e);
  };

  return (
    <div className="grid w-full grid-cols-2">
      <div>
        <Form method="post" encType="multipart/form-data">
          <h1>CREATE A NEW PRODUCT </h1>
          <div className="mt-10">
            <label className="flex flex-col gap-1">
              <span>Name: </span>
              <input
                ref={nameRef}
                name="name"
                className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                aria-invalid={actionData?.errors?.name ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.tname ? "name-error" : undefined
                }
              />
            </label>
            {actionData?.errors?.name && (
              <div className="pt-1 text-red-700" id="name-error">
                {actionData.errors.name}
              </div>
            )}
          </div>

          <div className="mt-8">
            <label className="flex flex-col gap-1">
              <span>Sku: </span>
              <input
                ref={skuRef}
                name="sku"
                className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                aria-invalid={actionData?.errors?.sku ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.sku ? "sku-error" : undefined
                }
              />
            </label>

            {actionData?.errors?.sku && (
              <div className="pt-1 text-red-700" id="sku-error">
                {actionData.errors.sku}
              </div>
            )}
          </div>

          <div className="mt-8">
            <label className="flex flex-col gap-1">
              <span>Quantity: </span>
              <input
                ref={quantityRef}
                name="quantity"
                className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                aria-invalid={actionData?.errors?.quantity ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.quantity ? "quantity-error" : undefined
                }
              />
            </label>

            {actionData?.errors?.quantity && (
              <div className="pt-1 text-red-700" id="quantity-error">
                {actionData.errors.quantity}
              </div>
            )}
          </div>

          <div className="mt-8">
            <label className="flex flex-col gap-1">
              <span>Price: </span>
              <input
                ref={priceRef}
                name="price"
                className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                aria-invalid={actionData?.errors?.price ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.price ? "price-error" : undefined
                }
              />
            </label>

            {actionData?.errors?.price && (
              <div className="pt-1 text-red-700" id="quantity-error">
                {actionData.errors.price}
              </div>
            )}
          </div>

          <div className="mt-8">
            <label className="flex flex-col gap-1">
              <span>Image: </span>
              <input
                name="img"
                type="file"
                accept="image/*"
                className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </label>
          </div>

          <div className="mt-10 flex justify-between">
            <Link
              to="/product/inventory"
              className="block rounded py-2 pr-4 pl-3 underline  text-gray-700 hover:bg-gray-100  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
              >
              Back to inventory
            </Link>
            <button
              type="submit"
              className="hover:bg-grey-600 focus:bg-grey-400 rounded bg-blue-500 py-2 px-4 text-white"
            >
              Save
            </button>
          </div>
        </Form>
      </div>


      <div class="relative border-grey-700 ml-10 border border-slate-600">
        <img id="output" alt="" />
      </div>
    </div>
  );
}
