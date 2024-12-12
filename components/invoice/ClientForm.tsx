"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { z } from "zod";
import AddressForm from "./AddressForm";

const ClientForm = ({ campo }: { campo: string }) => {
  const form = useFormContext();
  const isPending = form.formState.isLoading;

  return (
    <div className="space-y-4">
      {/* Client Name */}
      <FormField
        control={form.control}
        name={`${campo}.clientName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name:</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter Client Name"
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Client Email */}
      <FormField
        control={form.control}
        name={`${campo}.clientEmail`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Email:</FormLabel>
            <FormControl>
              <Input
                type="email"
                {...field}
                placeholder="Enter Client Email"
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Client Address */}
      <AddressForm campo={`${campo}.clientAddress`} />
    </div>
  );
};

export default ClientForm;
