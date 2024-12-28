import NewPasswordCard from "@/components/auth/NewPasswordCard";
import { Suspense } from "react";

const verificationPage = () => {
  return (
    <Suspense>
      <NewPasswordCard />
    </Suspense>
  );
};

export default verificationPage;
