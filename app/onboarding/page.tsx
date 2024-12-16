import OnBoardingForm from "@/components/OnBoardingForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { requireBuisnessDetail } from "@/utils/hooks";
import { redirect } from "next/navigation";

const OnBoardingPage = async () => {
  const user = await requireBuisnessDetail();
  if (user) history.back();
  return (
    <div className="flex h-screen items-center justify-center">
      <OnBoardingForm />
    </div>
  );
};

export default OnBoardingPage;
