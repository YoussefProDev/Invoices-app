"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/SubmitButtons";
import ClientForm from "./ClientForm";
import { InvoiceSchema } from "@/schemas";
import { motion } from "motion/react";
import InvoiceStepForm from "./InvoiceStepForm";

const SummaryStep = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold">Summary</h2>
    <p>Review your invoice details before submission.</p>
  </div>
);

const InvoiceForm: React.FC = () => {
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      client: {
        clientName: "",
        clientEmail: "",
        codiceDestinatario: "",
        pecDestinatario: "",
        clientAddress: {
          cap: "",
          comune: "",
          provincia: "",
          street: "",
        },
      },
      date: new Date(),
      invoiceNumber: "",
      note: "",
      regimeFiscale: "ORDINARIO",
      invoiceType: "FATTURA",
      services: [
        {
          description: "descrizione",
          quantity: 2,
          pricePerUnit: 22,
          ivaRate: 2,
          nature: "descrizione",
          startDate: new Date(),
          endDate: new Date(),
          totalPrice: 33,
        },
      ],
      // total: "",
      status: "PENDING",
    },
  });

  const steps = [
    { id: 0, label: "Client", component: <ClientForm campo="client" /> },
    { id: 1, label: "Invoice", component: <InvoiceStepForm /> },
    { id: 2, label: "Summary", component: <SummaryStep /> },
  ];

  const stepRefs = useRef<HTMLDivElement[]>([]);
  const [realStep, setRealStep] = useState(steps[0].id);
  const [activeStep, setActiveStep] = useState(realStep);
  // console.log(form.getValues());

  const handleStepChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index >= 0) {
            setActiveStep(index);
            setRealStep(index);
          }
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleStepChange, {
      root: null,
      threshold: 0.6,
    });

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      stepRefs.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, [handleStepChange]);

  const onSubmit = (formData: z.infer<typeof InvoiceSchema>) => {
    console.log("Submitted:", formData);
  };

  return (
    <Card className="max-w-full w-[95%] md:w-[80%] lg:w-[70%] mx-auto h-full relative ">
      <CardHeader>
        <div
          onMouseLeave={() => setActiveStep(realStep)}
          className="relative mx-auto sm:w-3/4 flex flex-wrap justify-center px-2 space-x-2 md:space-x-4 rounded-full border-2 border-black bg-white p-1"
        >
          {steps.map((step, index) => (
            <Button
              onMouseEnter={() => setActiveStep(step.id)}
              variant="ghost"
              key={step.id}
              onClick={() => {
                setRealStep(step.id);
                stepRefs.current[index]?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`relative rounded-full px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm font-medium ${
                activeStep === step.id ? "" : "hover:text-white/80"
              } outline-sky-400 transition focus-visible:outline-2`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {activeStep === step.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white"
                  style={{
                    borderRadius: 9999,
                    mixBlendMode: "difference",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {step.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 md:p-6">
        <div className="flex-1 flex flex-col">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col space-y-10"
            >
              <div className="w-full h-full flex pb-12 overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    ref={(el) => {
                      if (el) stepRefs.current[index] = el;
                    }}
                    className="w-full flex-none snap-start px-4 flex justify-center"
                  >
                    {step.component}
                  </div>
                ))}
              </div>

              <CardFooter>
                <SubmitButton text="Submit Invoice" isPending={false} />
              </CardFooter>
            </form>
          </FormProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
