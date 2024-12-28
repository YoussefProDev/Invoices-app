"use client";
import React, { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import AddressForm from "@/components/AddressForm";
import { ClientType } from "@/types/schemasTypes";
import { ClientWithAddress } from "@/types/dataTypes";

export const ClientPartForm = ({
  campo,
  client,
}: {
  campo?: string;
  client?: ClientWithAddress;
}) => {
  campo = campo ? `${campo}.` : "";
  const { control, setValue } = useFormContext();
  // Pre-fill the form when editing a client
  useEffect(() => {
    if (client) {
      console.log("client from cliant part form", client);

      setValue(`${campo}name`, client.name || "");
      setValue(`${campo}email`, client.email || "");
      setValue(`${campo}codiceDestinatario`, client.codiceDestinatario || "");
      setValue(`${campo}pecDestinatario`, client.pecDestinatario || "");
      setValue(`${campo}codiceFiscale`, client.codiceFiscale || "");
      setValue(`${campo}address.street`, client.address?.street || "");
      setValue(`${campo}address.cap`, client.address?.cap || "");
      setValue(`${campo}address.comune`, client.address?.comune || "");
      setValue(`${campo}address.provincia`, client.address?.provincia || "");
    }
  }, [client, setValue, campo]);
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`${campo}name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name:</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter Client Name"
                onChange={field.onChange}
                value={field.value}
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
          name={`${campo}codiceFiscale`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client CF:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="RSSMRA74D22A001Q"
                  className="uppercase"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${campo}email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter Client Email"
                  onChange={field.onChange}
                  value={field.value}
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
                  value={field.value}
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
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Address form will occupy full width */}
      <AddressForm campo={`${campo}address`} />
    </div>
  );
};

export default ClientPartForm;
