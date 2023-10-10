import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: ["/api/stripe-webhook"],
  publicRoutes: ["/admin", "/api/admin(.*)", "/share/(.*)"],

  debug: false,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

//
