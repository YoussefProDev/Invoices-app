import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PAGE, ONBOARDING_PAGE } from "@/routes";
import { redirect } from "next/navigation";
import { getUserById } from "./auth/users";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect(LOGIN_PAGE);
  }

  return session;
}

export async function requireBuisnessDetail() {
  const session = await requireUser();

  if (!session?.user) {
    redirect(LOGIN_PAGE);
  }
  const { id } = session.user;
  const user = await getUserById(id);

  const isBusinessDetailIncomplete =
    !user?.businessDetail ||
    Object.values(user.businessDetail).some((value) => !value);

  return isBusinessDetailIncomplete;
}
