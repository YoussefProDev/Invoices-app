"use client";

import React, { useState, useTransition } from "react";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import AddressForm from "@/components/invoice/AddressForm";
import { SubmitButton } from "@/components/SubmitButtons";
import ClientForm from "./ClientForm";
import { Label } from "../ui/label";
import UserForm from "./UserForm";
import { Textarea } from "../ui/textarea";

const InvoiceForm = () => {
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      total: "3",
      status: "PAID",
      date: new Date(),
      client: {
        clientName: "prova",
        clientEmail: "prova@gmail.co",
        codiceDestinatario: "dddd",
        pecDestinatario: "ccdd",
        clientAddress: {
          cap: "prova",
          comune: "evvai",
          provincia: "ok",
          street: "fffff",
        },
      },
      invoiceNumber: 44,
      note: "prova",
      regimeFiscale: "ORDINARIO",
      invoiceType: "FATTURA",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (formData: z.infer<typeof InvoiceSchema>) => {
    startTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log("Submitted data:", formData);
          resolve("done");
        }, 3000);
      });
    });
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Label>Clients:</Label>
          <ClientForm campo="client" />

          <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-4 pt-6">
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
          </div>

          <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-4">
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
                          className="w-full text-left justify-start"
                        >
                          <CalendarIcon className="mr-2" />
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
                          onSelect={(date) =>
                            setSelectedDate(date || new Date())
                          }
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
          </div>

          <div className="flex flex-col space-y-6">
            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (Optional):</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter Note (Optional)"
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
                    type="text"
                    {...field}
                    placeholder="Enter Total"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton text="Submit Invoice" isPending={isPending} />
        </form>
      </Form>
    </FormProvider>
  );
};

export default InvoiceForm;
