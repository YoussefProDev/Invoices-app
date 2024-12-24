"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ShadCN UI components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButtons";
import FormError from "@/components/auth/FormError";

// Schema
import { onBoardingSchema } from "@/schemas";

// Actions
import { onBoarding } from "@/actions/onBoarding";
import { cn } from "@/lib/utils";
import { OnBoardingType } from "@/types/schemasTypes";
import AddressForm from "./client/AddressForm";

const OnBoardingForm = () => {
  const form = useForm<OnBoardingType>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      taxCode: "",
      vatNumber: "",
      companyName: "",
      pec: "",
      address: {
        street: "",
        cap: "",
        comune: "",
        provincia: "",
      },
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = (formData: z.infer<typeof onBoardingSchema>) => {
    setError(""); // Reset dell'errore al submit
    startTransition(async () => {
      const result = await onBoarding(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Card className="w-[600px]  max-w-4xl mx-auto p-6 md:p-10 rounded-lg shadow-md bg-white">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Add Some Information
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Please fill in the details below to complete your onboarding.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-4">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        type="text"
                        placeholder="ACME Corp"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tax Code & VAT Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="taxCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Code:</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="text"
                          placeholder="RSSMRA74D22A001Q"
                          className="uppercase"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vatNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT Number:</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="text"
                          placeholder="IT123456789"
                          className="uppercase"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* PEC */}
              <FormField
                control={form.control}
                name="pec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PEC:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        type="email"
                        placeholder="example@pec.it"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Address */}
              <AddressForm campo="address" />
            </div>
            {/* Error Message */}
            {error && <FormError message={error} />}
            {/* Submit Button */}
            <SubmitButton
              text="Confirm"
              isPending={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors duration-200"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoardingForm;
