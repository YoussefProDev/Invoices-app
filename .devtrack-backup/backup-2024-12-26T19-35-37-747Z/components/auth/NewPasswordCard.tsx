"use client";
import React, { useState, useTransition } from "react";

import CardWrapper from "./CardWrapper";
import { useSearchParams } from "next/navigation";

import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

import { newPassword } from "@/actions/auth/reset";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { newPasswordSchema } from "@/schemas";
import { z } from "zod";
const NewPasswordCard = () => {
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const params = useSearchParams();
  const token = params?.get("token");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (formData: z.infer<typeof newPasswordSchema>) => {
    startTransistion(() => {
      if (!token) {
        setError("Missing Token");
        return;
      }

      newPassword(token, formData)
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
      headerLabel="Change Password"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="password"
                      placeholder="New Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordCard;
