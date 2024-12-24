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
import AddressForm from "./AddressForm";

export const ClientPartForm = ({ campo }: { campo?: string }) => {
  campo = campo ? `${campo}.` : "";
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`${campo}clientName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name:</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter Client Name"
                // onChange={field.onChange}
                // value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Use grid layout for the next fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${campo}clientCF`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client CF:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="RSSMRA74D22A001Q"
                  className="uppercase"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${campo}clientEmail`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter Client Email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${campo}codiceDestinatario`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codice Destinatario:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Codice Destinatario"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${campo}pecDestinatario`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>PEC Destinatario:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter PEC Destinatario"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Address form will occupy full width */}
      <AddressForm campo={`${campo}clientAddress`} />
    </div>
  );
};

export default ClientPartForm;
