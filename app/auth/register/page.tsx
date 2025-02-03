import RegisterForm from "@/components/auth/RegisterForm";
import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
const RegisterPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return <RegisterForm />;
};

export default RegisterPage;
