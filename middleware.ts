import { auth } from "@/auth";
import { authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;

  // Se la richiesta è pubblica o autenticata, consenti l'accesso
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    // Reindirizza alla pagina pubblica principale
    const newUrl = new URL("/", origin);
    return Response.redirect(newUrl);
  }
});

// Configurazione del matcher per escludere specifici percorsi
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Escludi risorse statiche e API
  ],
};
