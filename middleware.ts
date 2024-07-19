import { NextRequest, NextResponse } from "next/server";
import { getMiddlewareSession } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const {session, shouldDelete} = await getMiddlewareSession(request);

  const pathname = request.nextUrl.pathname;

  const protectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/categories") || pathname.startsWith("/reports") || pathname.startsWith("/settings") || pathname.startsWith("/transactions");

  const guestRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  let response = NextResponse.next();
  if (protectedRoute && !session)
    response = NextResponse.redirect(new URL("/login", request.url));
  if (guestRoute && session)
    response = NextResponse.redirect(new URL("/dashboard", request.url));

  if (shouldDelete) response.cookies.delete("session_id");
  return response;
}