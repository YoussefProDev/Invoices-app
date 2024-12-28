import NewVerificationCard from "@/components/auth/NewVerificationCard";
import { Suspense } from "react";

const verificationPage = () => {
  return (
    <Suspense>
      <NewVerificationCard />
    </Suspense>
  );
};

export default verificationPage;
