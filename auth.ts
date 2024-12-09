import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/utils/auth/users";
import { ERROR_PAGE, LOGIN_PAGE, NEW_VERIFICATION_PAGE } from "./routes";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: LOGIN_PAGE,
    signOut: LOGIN_PAGE,
    error: ERROR_PAGE,
    verifyRequest: NEW_VERIFICATION_PAGE,
  },
  events: {
    async linkAccount({ user }) {
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
  callbacks: {
    async signIn({ user, account }) {
      // console.log("provider: ", account?.provider);

      if (account?.provider === "credentials") {
        if (user.id) {
          const existingUser = await getUserById(user.id);
          if (!existingUser?.emailVerified) return false;
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // if (token.role && session.user) {
      //   session.user.role = token.role;
      // }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
