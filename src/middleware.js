import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // ignoredRoutes: ["/api/auth"],
  debug: true,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
