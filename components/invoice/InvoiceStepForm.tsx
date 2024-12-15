"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  invoiceTypeOptions,
  regimeFiscaleOptions,
  statusOptions,
} from "@/data/invoices";
import { Textarea } from "../ui/textarea";
import { formatCurrency } from "@/utils/formatCurrency";

const InvoiceStepForm = ({ isPending }: { isPending?: boolean }) => {
  const { control } = useFormContext();
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex space-x-4">
        {/* Invoice Type */}
        <FormField
          control={control}
          name="invoiceType"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Invoice Type</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {invoiceTypeOptions.map((inoiceType) => (
                    <SelectItem key={inoiceType} value={inoiceType}>
                      {inoiceType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Regime Fiscale */}
        <FormField
          control={control}
          name="regimeFiscale"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Invoice Type</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select regime Fiscale" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {regimeFiscaleOptions.map((regimeFiscale) => (
                    <SelectItem key={regimeFiscale} value={regimeFiscale}>
                      {regimeFiscale}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex space-x-4">
        {/* Invoice Number */}
        <FormField
          control={control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Invoice No.</FormLabel>
              <FormControl>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    #
                  </span>
                  <Input
                    {...field}
                    placeholder="Enter Invoice Number"
                    disabled={isPending}
                    className="rounded-l-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Date:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Status */}
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isPending}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {statusOptions.map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Notes */}
      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter any notes"
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <div className="w-1/3">
          {/* Subtotal */}
          {/* <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>
              {formatCurrency({
                amount: calculateTotal, // Funzione o valore per calcolare il subtotal
                currency: currency as any, // Valuta specificata
              })}
            </span>
          </div> */}

          {/* Total */}
          <div className="flex justify-between py-2 border-t">
            <FormField
              control={control}
              name="total"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only">Total</FormLabel>{" "}
                  {/* Nascosto per evitare duplicati */}
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <span>Total ({currency})</span>
                      <span className="font-medium underline underline-offset-2">
                        {formatCurrency({
                          amount: calculateTotal, // Funzione o valore per calcolare il total
                          currency: currency as any,
                        })}
                      </span>
                    </div>
                    {/* <Input
                      {...field}
                      type="number"
                      placeholder="Enter total amount"
                      className="sr-only" // Nascosto ma mantenuto per modifiche manuali
                      disabled={isPending} // Disabilitato se necessario
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Total */}
      <FormField
        control={control}
        name="total"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="Enter total amount"
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InvoiceStepForm;
