import { Form, PrefetchPageLinks, useLocation } from "@remix-run/react";
import { useState } from "react";
import { useGetParams } from "~/utils";

export const Search = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(() => {
    return searchQuery;
  });

  const getParams = useGetParams();

  return (
    <Form
      action="?"
      className="flex w-full items-center justify-center pt-20"
      onChange={(event) => {
        const formData = new FormData(event.currentTarget);
        const search = formData.get("search");
        setQuery(String(search));
      }}
      method="get"
    >
      <div className="relative mt-10 grid xs:w-9/12 xs:grid-cols-1 sm:grid-cols-2 md:w-full md:grid-cols-3 lg:w-9/12 lg:grid-cols-4">
        <input
          name="search"
          placeholder="Find by Name or Sku"
          className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
          defaultValue={searchQuery}
        />
      </div>
      {query ? (
        <PrefetchPageLinks
          page={`${location.pathname}${getParams({ search: query })}`}
        />
      ) : null}
      {!query && searchQuery ? (
        <PrefetchPageLinks
          page={`${location.pathname}${getParams({ search: "" })}`}
        />
      ) : null}
    </Form>
  );
};
