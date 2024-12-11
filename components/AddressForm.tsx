"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { z } from "zod";

const AddressForm = ({ campo }: { campo: string }) => {
  const form = useFormContext();
  const isPending = form.formState.isLoading;

  return (
    <div className="space-y-4">
      {/* Street & Number */}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${campo}.number`}
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
                />
              </FormControl>
              <FormMessage />
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
                />
              </FormControl>
              <FormMessage />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
