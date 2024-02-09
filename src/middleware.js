import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: ["/api/stripe-webhook", "/share(.*)", "/api/project/(.*)/share"],
  publicRoutes: ["/admin", "/", "/(.*)", "/api/admin(.*)", "/share(.*)", "/api/project/(.*)/share", "/api/project"],

  debug: false,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)",  "/(api|trpc)(.*)"],
};

