"use client";

import React, { useState } from "react";
import z from "zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButtons";
import ClientForm from "./ClientForm";

// Address Form Component
export const AddressForm = ({ campo }) => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-4 grid-cols-2">
      <FormField
        control={control}
        name={`${campo}.street`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street:</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Street" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${campo}.comune`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comune:</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Comune" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${campo}.provincia`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Provincia:</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Provincia" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${campo}.cap`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CAP:</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter CAP" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

// // Service Form Component
// export const ServiceForm = ({ campo }) => {
//   const { control } = useFormContext();

//   return (
//     <div className="space-y-4">
//       <FormField
//         control={control}
//         name={`${campo}.serviceName`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Service Name:</FormLabel>
//             <FormControl>
//               <Input {...field} placeholder="Enter Service Name" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`${campo}.serviceDescription`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Description:</FormLabel>
//             <FormControl>
//               <Textarea {...field} placeholder="Enter Service Description" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`${campo}.servicePrice`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Price:</FormLabel>
//             <FormControl>
//               <Input
//                 type="number"
//                 {...field}
//                 placeholder="Enter Service Price"
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// };

const InvoiceForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const form = useForm({
    resolver: zodResolver(z.object({})),
    defaultValues: {
      date: new Date(),
      client: {
        clientName: "prova",
        clientEmail: "prova@gmail.co",
        codiceDestinatario: "dddd",
        pecDestinatario: "ccdd",
        clientAddress: {
          cap: "20222",
          comune: "evvai",
          provincia: "ok",
          street: "fffff",
        },
      },
      invoiceNumber: "44",
      note: "prova",
      regimeFiscale: "ORDINARIO",
      invoiceType: "FATTURA",
      total: "3",
      status: "PAID",
    },
  });

  const steps = [
    { id: 0, label: "Client", component: <ClientForm campo="client" /> },
    {
      id: 1,
      label: "Invoice",
      component: (
        <InvoiceStep
          form={form}
          isPending={false}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ),
    },
    { id: 2, label: "Summary", component: <SummaryStep /> },
  ];

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
    const container = document.querySelector(".snap-container");
    if (container) {
      const stepElement = container.children[stepIndex];
      stepElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmit = (formData: FormData) => {
    console.log("ok", formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        {/* Step Buttons */}
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <Button
              key={step.id}
              onClick={() => handleStepChange(step.id)}
              variant={currentStep === step.id ? "default" : "outline"}
            >
              {step.label}
            </Button>
          ))}
        </div>

        {/* Step Content */}
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="snap-container w-full flex overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="w-full flex-none snap-start h-full flex justify-center items-center px-4"
                    style={{ minWidth: "100%" }}
                  >
                    {step.component}
                  </div>
                ))}
              </div>

              <SubmitButton text="Submit Invoice" isPending={false} />
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

const InvoiceStep = ({ form, isPending, selectedDate, setSelectedDate }) => (
  <div className="w-full max-w-md space-y-6">
    {/* Invoice Number */}
    <FormField
      control={form.control}
      name="invoiceNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Invoice Number</FormLabel>
          <FormControl>
            <Input
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
          <FormLabel>Date</FormLabel>
          <FormControl>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full text-left justify-start"
              >
                <CalendarIcon className="mr-2" />
                {selectedDate.toDateString()}
              </Button>
              <Calendar
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date || new Date())}
                mode="single"
                fromDate={new Date()}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const SummaryStep = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold">Summary</h2>
    <p>Review your invoice details before submission.</p>
  </div>
);

export default InvoiceForm;
