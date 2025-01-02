"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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

import { InvoiceSchema } from "@/schemas";
import { motion } from "motion/react";
import InvoiceStepForm from "./InvoiceStepForm";
import ClientStepForm from "./ClientStepForm";
import SummaryStep from "./SummaryStep";
import { createInvoice } from "@/actions/invoices";
import { InvoiceType } from "@/types/schemasTypes";
import FormError from "@/components/auth/FormError";

const InvoiceForm: React.FC = () => {
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      invoiceType: "FATTURA", // default valid value
      regimeFiscale: "FORFETTARIO", // default valid value
      invoiceNumber: "", // empty string as a placeholder for invoice number
      currency: "EUR", // optional
      total: "", // optional
      client: {
        name: "",
        email: "",
        codiceDestinatario: "",
        pecDestinatario: "",
        codiceFiscale: "",
        address: {
          street: "",
          cap: "",
          comune: "",
          provincia: "",
        },
      },
      date: new Date(), // default to current date
      status: "PENDING", // default status
      services: [], // at least one service, empty as a placeholder
      note: "", // optional and empty
    },
  });

  const steps = [
    {
      id: 0,
      label: "Client",
      component: <ClientStepForm />,
    },
    { id: 1, label: "Invoice", component: <InvoiceStepForm /> },
    { id: 2, label: "Summary", component: <SummaryStep /> },
  ];

  const stepRefs = useRef<HTMLDivElement[]>([]);

  const [realStep, setRealStep] = useState(steps[0].id);
  const [activeStep, setActiveStep] = useState(realStep);

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
    // Copia il valore corrente di stepRefs.current per il setup e il cleanup
    const stepsCopy = [...stepRefs.current];

    const observer = new IntersectionObserver(handleStepChange, {
      root: null,
      threshold: 0.6,
    });

    stepsCopy.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      stepsCopy.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, [handleStepChange]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const onSubmit = (formData: InvoiceType) => {
    console.log("Submitted:", formData);

    startTransition(async () => {
      try {
        const response = await createInvoice(formData);

        setError(response?.error);
      } catch (err) {
        console.error("Error submitting the form:", err);
        setError("An unexpected error occurred.");
      }
    });
  };

  return (
    <Card className="max-w-full w-[95%] md:w-[80%] lg:w-[70%] mx-auto h-full relative">
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
                  inline: "center", // Centra sull'asse X
                  block: "nearest", // Mantiene la posizione attuale sull'asse Y
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
              <FormError message={error} />
            </form>
          </FormProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
