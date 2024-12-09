"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/auth/users";
import { generateVerifacationToken } from "@/utils/auth/tokens";
import { sendVerifacationEmail } from "@/utils/auth/email";
import { hashPassword } from "@/utils/auth/passwordCheck";
export const register = async (formData: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials" };
  }

  const { firstName, lastName, address, email, password } =
    validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email Already In Use" };
  }
  // Genera un hash sicuro per la password
  const hashedPassword = await hashPassword(password);

  await db.user.create({
    data: {
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
    },
  });
  const verifacationToken = await generateVerifacationToken(email);
  const token = verifacationToken.token;
  const name = `${firstName} ${lastName}`;
  await sendVerifacationEmail({ name, email, token });
  return { success: "Confirm Email Sent!" };
};
