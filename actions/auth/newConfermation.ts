"use server";

import { db } from "@/lib/db";
import { getVerifacationTokenByToken } from "@/utils/auth/tokens";
import { getUserByEmail } from "@/utils/auth/users";

export const newVerification = async (token: string) => {
  const exsistingToken = await getVerifacationTokenByToken(token);
  // console.log("token: ", token);

  if (!exsistingToken) return { error: "Token Does Not Exist" };
  const hasExpired = new Date(exsistingToken.expires) < new Date();
  if (hasExpired) return { error: "Token Has Expired" };
  const { email } = exsistingToken;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email Does Not Exist!" };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: exsistingToken.email,
    },
  });
  await db.verificationToken.delete({
    where: {
      id: exsistingToken.id,
    },
  });
  return { success: "Email Verified!" };
};
