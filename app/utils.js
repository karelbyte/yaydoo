import { useMatches, useLocation } from "@remix-run/react";
import { useMemo } from "react";

const DEFAULT_REDIRECT = "/";

export function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}


export function useMatchesData(id) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

function isUser(user) {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email) {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}


export function getRequestParams(request, params) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.searchParams)

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value))
  })

  return `?${searchParams.toString()}`
}

export function useGetParams() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  return (params) => {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value))
    })
    return `?${searchParams.toString()}`
  }
}