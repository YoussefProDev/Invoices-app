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
import { useFormContext } from "react-hook-form";

const AddressForm = ({ campo }: { campo: string }) => {
  const form = useFormContext();
  const isPending = form.formState.isLoading;

  return (
    <div className="space-y-4">
      {/* Street */}
      <div className="flex space-x-4">
        <FormField
          control={form.control}
          name={`${campo}.street`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Street:</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  type="text"
                  placeholder="Main Street"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <div className="h-6 text-red-500 text-sm">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      {/* CAP, Comune & Provincia */}
      <div className="flex space-x-4">
        <FormField
          control={form.control}
          name={`${campo}.cap`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>CAP:</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  type="text"
                  placeholder="20100"
                  onChange={field.onChange}
                  value={field.value}
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
          name={`${campo}.comune`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Comune:</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  type="text"
                  placeholder="Milano"
                  onChange={field.onChange}
                  value={field.value}
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
          name={`${campo}.provincia`}
          render={({ field }) => (
            <FormItem className="w-24">
              <FormLabel>Provincia:</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  type="text"
                  placeholder="MI"
                  className="uppercase"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <div className="h-6 text-red-500 text-sm">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
