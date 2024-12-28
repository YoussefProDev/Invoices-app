import ConfirmationEmailTemplate from "@/components/auth/email/ConfirmationEmailTemplate";
import PasswordResetTemplate from "@/components/auth/email/PasswordResetTemplate";
import { resend } from "@/lib/resend";

export const sendVerifacationEmail = async ({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: "Auth <confirmation@youssefprodev.com>",
    to: email,
    subject: "Confirmation Link",
    react: ConfirmationEmailTemplate({ name, token }),
  });

  if (error) {
    return {};
  }
};

export const sendPasswordResetEmail = async ({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: "Password <Reset@youssefprodev.com>",
    to: email,
    subject: "Reset Password",
    react: PasswordResetTemplate({ name, token }),
  });

  if (error) {
    return {};
  }
};
