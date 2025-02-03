import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";
import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
