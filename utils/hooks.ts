import { auth } from "@/auth";
import { LOGIN_PAGE } from "@/routes";
import { redirect } from "next/navigation";
import { getUserById } from "./auth/users";

export async function requireUserSession() {
  const session = await auth();

  if (!session?.user) {
    redirect(LOGIN_PAGE);
  }

  return session.user;
}

export async function requireBuisnessDetail() {
  const userSession = await requireUserSession();

  if (!userSession) {
    redirect(LOGIN_PAGE);
  }
  const { id } = userSession;
  const user = await getUserById(id);

  const isBusinessDetailIncomplete =
    !user?.businessDetail ||
    Object.values(user.businessDetail).some((value) => !value);

  return isBusinessDetailIncomplete;
}
