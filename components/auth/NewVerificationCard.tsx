"use client";
import React, { useState, useTransition } from "react";

import CardWrapper from "./CardWrapper";
import { useSearchParams } from "next/navigation";

import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/auth/newConfermation";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { Button } from "../ui/button";
const NewVerificationCard = () => {
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const params = useSearchParams();
  const token = params?.get("token");
  if (!token) {
    setError("Missing Token");
    return;
  }
  const onSubmit = () => {
    startTransistion(() => {
      newVerification(token)
        .then((result) => {
          setError(result?.error);
          setSuccess(result?.success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!error && !success && !isPending && (
          <Button onClick={onSubmit}>Confirm</Button>
        )}

        {isPending && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationCard;
