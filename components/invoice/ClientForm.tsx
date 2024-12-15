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

export const ClientForm = ({ campo }: { campo: string }) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`${campo}.clientName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name:</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Client Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        <FormField
          control={control}
          name={`${campo}.clientCF`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Client CF:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Client CF" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${campo}.clientEmail`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Client Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter Client Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex space-x-4">
        <FormField
          control={control}
          name={`${campo}.codiceDestinatario`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Codice Destinatario:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Codice Destinatario" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${campo}.pecDestinatario`}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>PEC Destinatario:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter PEC Destinatario"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <AddressForm campo={`${campo}.clientAddress`} />
    </div>
  );
};

export default ClientForm;
