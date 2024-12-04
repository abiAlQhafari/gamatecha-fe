import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const accessToken = request.get("accessToken")?.value;
  // if (!accessToken) {
  //   // Jika token tidak ada, redirect ke halaman login
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // try {
  //   // Verifikasi token dengan Backend
  //   const verifyResponse = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/validate`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   if (!verifyResponse.ok) {
  //     // Jika verifikasi gagal, redirect ke login
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // } catch {
  //   // Jika terjadi error (misalnya Backend tidak dapat diakses), redirect ke login
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // // Jika token valid, lanjutkan ke halaman yang diminta
  // return NextResponse.next();
}

// Konfigurasi path yang dipantau middleware
export const config = {
  matcher: "/dashboard/:path*", // Middleware hanya berlaku untuk path tertentu
};
