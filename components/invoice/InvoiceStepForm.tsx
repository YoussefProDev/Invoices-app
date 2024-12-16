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
import ServicesForm from "./ServicesForm";

const InvoiceStepForm = ({ isPending }: { isPending?: boolean }) => {
  const { control } = useFormContext();
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <div className="w-full space-y-6 md:max-w-md lg:max-w-lg">
      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Invoice Type */}
        <FormField
          control={control}
          name="invoiceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Type</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Invoice Type" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {invoiceTypeOptions.map((invoiceType) => (
                    <SelectItem key={invoiceType} value={invoiceType}>
                      {invoiceType}
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
            <FormItem>
              <FormLabel>Regime Fiscale</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Regime Fiscale" />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Invoice Number */}
        <FormField
          control={control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
                      <CalendarIcon className="h-4 w-4 opacity-50" />
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
                  <SelectValue placeholder="Select Status" />
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
      {/* Services */}
      <ServicesForm />

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

      {/* Subtotal and Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="col-span-1">
          <div className="flex justify-between py-2 border-t">
            <FormField
              control={control}
              name="total"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only">Total</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <span>Total ({currency})</span>
                      <span className="font-medium underline underline-offset-2">
                        {formatCurrency({
                          amount: calculateTotal,
                          currency: currency as any,
                        })}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStepForm;
