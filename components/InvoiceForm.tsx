"use client";

import React, { useState, useTransition } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn UI components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// schema
import { InvoiceSchema } from "@/schemas";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import AddressForm from "./AddressForm";

const InvoiceForm = () => {
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      invoiceName: "",
      total: 0,
      status: "PAID",
      date: new Date(),
      dueDate: 0,
      fromName: "",
      fromEmail: "",
      fromAddress: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      currency: "",
      invoiceNumber: 0,
      note: "",
      regimeFiscale: "ORDINARIO",
      invoiceType: "FATTURA",
      year: new Date().getFullYear(),
    },
  });

  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (formData: z.infer<typeof InvoiceSchema>) => {
    startTransition(() => {
      console.log("Submitted data:", formData);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1>Clients:</h1>
        <div>
          {/* From Name */}
          <FormField
            control={form.control}
            name="fromName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Name:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Sender Name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* From Email */}
          <FormField
            control={form.control}
            name="fromEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Email:</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter Sender Email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* From Address */}
          <FormField
            control={form.control}
            name="fromAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Address:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Sender Address"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Client Name */}
          <FormField
            control={form.control}
            name="clientName"
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
            name="clientEmail"
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
          <FormField
            control={form.control}
            name="clientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Address:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Client Address"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Total */}
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter Total"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="PAID or PENDING"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date:</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[280px] text-left justify-start"
                    >
                      <CalendarIcon />

                      {selectedDate ? (
                        new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(selectedDate)
                      ) : (
                        <span>Pick a Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date || new Date())}
                      mode="single"
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date (Days):</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter Due Date in days"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Currency */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Currency"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Invoice Number */}
        <FormField
          control={form.control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Number:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter Invoice Number"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional):</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Note (Optional)"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Regime Fiscale */}
        <FormField
          control={form.control}
          name="regimeFiscale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regime Fiscale:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Regime Fiscale"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Invoice Type */}
        <FormField
          control={form.control}
          name="invoiceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Type:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Invoice Type"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter Year"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          Submit Invoice
        </Button>
      </form>
    </Form>
  );
};

export default InvoiceForm;
