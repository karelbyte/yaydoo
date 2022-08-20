
import { Form, Link, Outlet,} from "@remix-run/react";
import { useUser } from "~/utils";

export default function ProductPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <div className="flex">
          <img src="../logo.png" className="mr-3 h-6 sm:h-9" alt="Yaydoo Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Mega Shoes
          </span>
        </div>

        <div className="flex"><span className="mr-4">{user.email}</span> {user.role == 'admin' && <p> (ADMIN ACOUNT)</p> }</div>
        <div className="flex">
          <Form action="/" method="get">
            <button
              type="submit"
              className="rounded py-2 px-2 text-blue-100 hover:text-blue-500 active:bg-blue-600"
            >
              Shop
            </button>
          </Form>

          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded py-2 px-4 text-blue-100 hover:text-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </div>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-40 bg-gray-50 shadow-md shadow-gray-900">
          <div className="w-full ">
            <Link
              to="/product/dashboard"
              className="block w-full cursor-pointer border-b border-gray-200 py-2 px-4 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 "
            >
              Dashboard
            </Link>
            <Link
              to="/product/quotes"
              className="block w-full cursor-pointer border-b border-gray-200 py-2 px-4 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 "
            >
              Quotes
            </Link>
            <Link
              to="/product/orders"
              className="block w-full cursor-pointer border-b border-gray-200 py-2 px-4 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 "
            >
              Orders
            </Link>
            <Link
              to="/product/inventory"
              className="block w-full cursor-pointer  py-2 px-4 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 "
            >
              Inventory
            </Link>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
