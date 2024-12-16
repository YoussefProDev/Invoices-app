import { auth } from "@/auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PAGE, ONBOARDING_PAGE } from "@/routes";
import { redirect } from "next/navigation";

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
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      BusinessDetail: true,
    },
  });
  if (
    !user?.BusinessDetail ||
    Object.values(user.BusinessDetail).some((value) => !value)
  ) {
    redirect(ONBOARDING_PAGE);
  }

  return user;
}
