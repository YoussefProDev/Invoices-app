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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButtons";
import FormError from "@/components/auth/FormError";

// Schema
import { onBoardingSchema } from "@/schemas";

// Actions
import { onBoarding } from "@/actions/onBoarding";
import { cn } from "@/lib/utils";
import { OnBoardingType } from "@/types/schemasTypes";
import AddressForm from "./AddressForm";

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
    <Card className="w-full max-w-5xl mx-auto p-6 md:p-12 rounded-xl shadow-lg bg-white">
      <CardHeader>
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Add Your Information
          </h1>
          <p className="text-gray-600 text-lg">
            Please fill in the required details to complete your onboarding.
          </p>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-6">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Company Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        type="text"
                        placeholder="ACME Corp"
                        className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </FormControl>
                    <div className="h-6 text-red-500 text-sm">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {/* Tax Code & VAT Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="taxCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Tax Code:
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="text"
                          placeholder="RSSMRA74D22A001Q"
                          className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </FormControl>
                      <div className="h-6 text-red-500 text-sm">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vatNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        VAT Number:
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="text"
                          placeholder="IT123456789"
                          className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </FormControl>
                      <div className="h-6 text-red-500 text-sm">
                        <FormMessage />
                      </div>
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
                    <FormLabel className="text-lg font-medium text-gray-700">
                      PEC:
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        type="email"
                        placeholder="example@pec.it"
                        className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </FormControl>
                    <div className="h-6 text-red-500 text-sm">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {/* Address */}
              <AddressForm campo="address" />
            </div>
            {/* Error Message */}
            <div className="h-6">{error && <FormError message={error} />}</div>

            {/* Submit Button */}
            <CardFooter className="flex justify-center mt-4">
              <SubmitButton
                text="Confirm"
                isPending={isPending}
                className="w-full max-w-[350px] px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors duration-200"
              />
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoardingForm;
