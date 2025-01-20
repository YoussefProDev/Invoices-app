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

  const onSubmit = (formData: OnBoardingType) => {
    setError(""); // Reset dell'errore al submit
    startTransition(async () => {
      const result = await onBoarding(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };
  return (
    <Card className="w-full max-w-5xl mx-auto p-6 rounded-xl">
      <CardHeader className="p-6 bg-white rounded-t-xl">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Your Information
          </h1>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white rounded-b-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-800">
                      Company Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        type="text"
                        placeholder="ACME Corp"
                        className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Tax Code, VAT Number & PEC */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tax Code & VAT Number on small screens, side by side on medium and larger screens */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="taxCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium text-gray-800">
                          Tax Code:
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="RSSMRA74D22A001Q"
                            className="uppercase w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium text-gray-800">
                          VAT Number:
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="IT123456789"
                            className="uppercase w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* PEC on small screens takes full width, on medium and larger screens it's in the third column */}
                <FormField
                  control={form.control}
                  name="pec"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-800">
                        PEC:
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="email"
                          placeholder="example@pec.it"
                          className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Address */}
              <AddressForm campo="address" />
            </div>

            {/* Error Message */}
            <div className="mt-6 text-center">
              {error && <FormError message={error} />}
            </div>

            {/* Submit Button */}
            <CardFooter className="flex justify-center p-6">
              <SubmitButton
                text="Confirm"
                isPending={isPending}
                className="w-full max-w-[350px] px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-md transition-colors duration-200"
              />
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoardingForm;
