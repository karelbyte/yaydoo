import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import ProductCard  from "~/components/productCard";
import NavBar from "~/components/navBar";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main >
       <NavBar/>
       <div className="min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
       <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ProductCard/>
        </div>
      </div>
       </div>
      
    </main>
  );
}
