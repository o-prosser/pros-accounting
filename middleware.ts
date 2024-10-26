import { NextRequest, NextResponse } from "next/server";
import { getMiddlewareSession } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const { session, shouldDelete } = await getMiddlewareSession(request);

  const pathname = request.nextUrl.pathname;

  const protectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/setup");

  const guestRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname === '/';

  let response = NextResponse.next();
  const url = request.nextUrl.clone();
  if (protectedRoute && !session) url.pathname = 'login';
  if (guestRoute && session) url.pathname = "dashboard"

    if (guestRoute && session || (protectedRoute && !session)) NextResponse.rewrite(url);

  if (shouldDelete) response.cookies.delete("session_id");
  return response;
};
