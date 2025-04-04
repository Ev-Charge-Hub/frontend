import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get token from cookies
  const pathname = req.nextUrl.pathname; // Get current path

  // Skip token validation for login page
  if (pathname === "/login") {
    // Only redirect if user already has a valid token
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/security/validate-token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { valid, role } = await response.json();

          if (valid) {
            // Redirect based on role
            const redirectPath = role === "ADMIN" ? "/admin" : "/find-ev-station";
            return NextResponse.redirect(new URL(redirectPath, req.url));
          }
        }
      } catch (error) {
        // If validation fails, let them stay on login page
      }
    }

    // If no token or invalid token, proceed to login page
    return NextResponse.next();
  }

  // For all other protected routes, require a valid token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if no token
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/security/validate-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const { valid, role } = await response.json(); // Expecting { valid: boolean, role: "USER" | "ADMIN" }

    if (!valid) {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect if token is invalid
    }

    // Role-based access control
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/find-ev-station", req.url)); // Redirect to main page instead of login
    }

    return NextResponse.next(); // Proceed if authorized
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect on error
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/login", "/find-ev-station/:path*", "/admin/:path*"], // Protect these routes
};