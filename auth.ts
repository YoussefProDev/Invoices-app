import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/utils/auth/users";
import { ERROR_PAGE, LOGIN_PAGE, NEW_VERIFICATION_PAGE } from "./routes";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Configurazione delle pagine personalizzate
  pages: {
    signIn: LOGIN_PAGE, // Pagina di login personalizzata
    signOut: LOGIN_PAGE, // Pagina di logout personalizzata
    error: ERROR_PAGE, // Pagina di errore personalizzata
    // verifyRequest: NEW_VERIFICATION_PAGE, // Pagina per verificare l'email
  },

  // Eventi di NextAuth
  events: {
    async linkAccount({ user }) {
      // Aggiorna l'email come verificata quando un account è collegato
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  // Callback di NextAuth
  callbacks: {
    // Controllo di accesso durante il sign-in
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        if (user.id) {
          const existingUser = await getUserById(user.id);
          // Blocca l'accesso se l'email non è verificata
          if (!existingUser?.emailVerified) return false;
        }
      }
      return true; // Consenti l'accesso in tutti gli altri casi
    },

    // Callback per la sessione
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; // Aggiunge l'ID dell'utente alla sessione
      }
      return session;
    },

    // Callback per il token JWT
    async jwt({ token }) {
      if (!token.sub) {
        return token; // Ritorna il token non modificato se sub è assente
      }

      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token; // Ritorna il token non modificato se l'utente non esiste
      }

      return token; // Ritorna il token senza ulteriori modifiche
    },
  },

  // Configurazione dell'adapter di Prisma
  adapter: PrismaAdapter(db),

  // Configurazione della sessione
  session: {
    strategy: "jwt", // Usa i JWT per gestire le sessioni
    maxAge: 60 * 60, // La sessione scade dopo 1 ora
  },

  // Configurazione del JWT
  jwt: {
    maxAge: 60 * 60, // Il token JWT scade dopo 1 ora
  },

  // Configurazioni aggiuntive
  ...authConfig,
});
