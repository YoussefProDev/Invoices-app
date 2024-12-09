"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import z from "zod";
//form
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
import { ResetSchema } from "@/schemas";
import { Button } from "../ui/button";
import { sendReset } from "@/actions/auth/reset";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const onSubmit = (formData: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransistion(() => {
      sendReset(formData).then((result) => {
        setError(result?.error);
        setSuccess(result?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Reset Password"
      backButtonLabel="Go Back To Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="email"
                      placeholder="yourmail@example.com"
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
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
