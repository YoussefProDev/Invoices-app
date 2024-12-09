import { auth } from "@/auth";
import { LOGIN_PAGE } from "@/routes";
import { redirect } from "next/navigation";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect(LOGIN_PAGE);
  }

  return session;
}
