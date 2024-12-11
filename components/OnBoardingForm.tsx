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

const OnBoardingForm = () => {
  // Hook per la gestione del form con React Hook Form e Zod
  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      taxCode: "",
      vatNumber: "",
      companyName: "",
      pec: "",
      street: "",
      number: "",
      cap: "",
      comune: "",
      provincia: "",
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
      // try {

      // } catch (err) {
      //   setError("An unexpected error occurred. Please try again.");
      //   console.error(err);
      // }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-3xl font-semibold")}>Add Some Information</h1>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tax Code & VAT Number */}
              <div className="flex space-x-4">
                {/* Tax Code */}
                <FormField
                  control={form.control}
                  name="taxCode"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Tax Code:</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="text"
                          placeholder="RSSMRA74D22A001Q"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* VAT Number */}
                <FormField
                  control={form.control}
                  name="vatNumber"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>VAT Number:</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="text"
                          placeholder="IT123456789"
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
              <div className="space-y-4">
                {/* Street & Number */}
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Street:</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="Main Street"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormLabel>Number:</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="123"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Cap & Comune  & Provincia */}
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="cap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CAP:</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="20100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comune"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comune:</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="Milano"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="provincia"
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormLabel>Provincia:</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            type="text"
                            placeholder="MI"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <FormError message={error} />
            <SubmitButton text="Confirm" isPending={isPending} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoardingForm;
