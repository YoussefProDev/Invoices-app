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

const UserForm = ({ campo }: { campo: string }) => {
  const form = useFormContext();
  const isPending = form.formState.isLoading;

  return (
    <div className="space-y-4">
      {/* User Name */}
      <FormField
        control={form.control}
        name={`${campo}.userName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name:</FormLabel>
            <FormControl>
              <Input {...field} placeholder="User Name" disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* User Email */}
      <FormField
        control={form.control}
        name={`${campo}.userEmail`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Email:</FormLabel>
            <FormControl>
              <Input
                type="email"
                {...field}
                placeholder="User Email"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* User Address */}
      <AddressForm campo={`${campo}.userAddress`} />
    </div>
  );
};

export default UserForm;
