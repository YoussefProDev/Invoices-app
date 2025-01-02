"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  invoiceTypeOptions,
  regimeFiscaleOptions,
  statusOptions,
  currencyOptions,
} from "@/data/invoices";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceType } from "@/types/schemasTypes";
import { formatCurrency } from "@/utils/formatCurrency";
import ServicesTable from "./services/ServicesList";
import { SelectField } from "./SelectField";
import { useData } from "@/providers/DataProvider";

const InvoiceStepForm = ({ isPending }: { isPending?: boolean }) => {
  const [currency, setCurrency] = useState<string>("EUR");
  const [dateOpen, setDateOpen] = useState(false);
  const { control, getValues, setValue } = useFormContext<InvoiceType>();
  const services = getValues("services");

  // Calculate total when services change
  const calculateTotal = useMemo(() => {
    return services?.reduce(
      (acc, { totalPrice }) => acc + (totalPrice ?? 0),
      0
    );
  }, [services]);
  const { invoices } = useData();
  const lastInvoiceNumber =
    invoices.sort((a, b) => b.invoiceNumber - a.invoiceNumber)[0]
      ?.invoiceNumber ?? 0;
  useEffect(() => {
    setValue(
      "total",
      formatCurrency({
        amount: calculateTotal ?? 0,
        currency,
      })
    );
  }, [calculateTotal, setValue, currency]);

  return (
    <div className="w-full space-y-6 md:max-w-md lg:max-w-lg">
      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          name="invoiceType"
          options={invoiceTypeOptions}
          label="Invoice Type"
          disabled={isPending}
        />
        <SelectField
          name="regimeFiscale"
          options={regimeFiscaleOptions}
          label="Regime Fiscale"
          disabled={isPending}
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
                  <span
                    onClick={() =>
                      setValue(
                        "invoiceNumber",
                        (lastInvoiceNumber + 1).toString()
                      )
                    }
                    className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center"
                  >
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
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
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
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      field.onChange(e);
                      setDateOpen(false);
                    }}
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

      {/* Status and Currency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          name="status"
          options={statusOptions}
          label="Status"
          disabled={isPending}
        />
        <SelectField
          name="currency"
          options={currencyOptions}
          label="Currency"
          disabled={isPending}
          onChange={setCurrency}
        />
      </div>

      {/* Services */}
      <ServicesTable />

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
      <div className="grid grid-cols-1 gap-4 mt-6">
        <FormField
          control={control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-between">
                  <span>Total ({currency})</span>
                  <Input
                    {...field}
                    value={field.value}
                    readOnly
                    onChange={field.onChange}
                    className="font-medium text-right bg-transparent border-none outline-none shadow-none"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default InvoiceStepForm;
