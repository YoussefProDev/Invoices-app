import OnBoardingForm from "@/components/OnBoardingForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { requireBuisnessDetail } from "@/utils/hooks";
import { redirect } from "next/navigation";

const OnBoardingPage = async () => {
  const isBusinessDetailIncomplete = await requireBuisnessDetail();
  if (!isBusinessDetailIncomplete) {
    // redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-fuchsia-500 to-cyan-500 ">
      <OnBoardingForm />
    </div>
  );
};

export default OnBoardingPage;
