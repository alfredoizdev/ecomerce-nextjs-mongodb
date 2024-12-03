import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from '@/app/auth/02-stateless-session';
import { cookies } from "next/headers";
import { decrypt } from "./utils/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin/dashboard", "member/profile"];
// const publicRoutes = [
//   "/signin",
//   "/signup",
//   "/",
//   "products",
//   "product/[id]",
//   "cart",
//   "collection/[slug]",
//   "collection",
// ];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  //const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // if (
  //   isPublicRoute &&
  //   cookie !== undefined &&
  //   !req.nextUrl.pathname.startsWith("/admin")
  // ) {
  //   return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  // }

  return NextResponse.next();
}
