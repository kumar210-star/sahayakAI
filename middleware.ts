import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/assistant",
  "/eligibility",
  "/saved",
  "/tracker",
  "/notifications",
  "/profile",
  "/settings",
];

// Routes that logged-in users should NOT be able to visit
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { cookie: req.headers.get("cookie") ?? "" },
    },
  });

  const { data: { session } } = await supabase.auth.getSession();

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Unauthenticated user trying to access a protected page
  if (isProtected && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user trying to access login/register pages
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
