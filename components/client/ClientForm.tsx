"use client";

import React, { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButtons";

import { ClientSchema } from "@/schemas";
import { ClientType } from "@/types/schemasTypes";
import ClientPartForm from "./ClientPartForm";
import { createClient, updateClient } from "@/actions/client";
import FormError from "../auth/FormError";
import { ClientWithAddress } from "@/types/dataTypes";
import { Form } from "../ui/form";

const ClientForm = ({ client }: { client?: ClientWithAddress }) => {
  // React Hook Form configuration
  const form = useForm<ClientType>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      codiceDestinatario: "",
      pecDestinatario: "",
      clientCF: "",
      clientAddress: {
        street: "",
        cap: "",
        comune: "",
        provincia: "",
      },
    },
  });

  // Pre-fill the form when editing a client
  useEffect(() => {
    if (client) {
      form.setValue("clientName", client.name || "");
      form.setValue("clientEmail", client.email || "");
      form.setValue("codiceDestinatario", client.codiceDestinatario || "");
      form.setValue("pecDestinatario", client.pecDestinatario || "");
      form.setValue("clientCF", client.codiceFiscale || "");
      form.setValue("clientAddress.street", client.address?.street || "");
      form.setValue("clientAddress.cap", client.address?.cap || "");
      form.setValue("clientAddress.comune", client.address?.comune || "");
      form.setValue("clientAddress.provincia", client.address?.provincia || "");
    }
  }, [client, form]);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  // Form submission handler
  const onSubmit = (formClient: ClientType) => {
    console.log("Submitted:", formClient);

    startTransition(async () => {
      try {
        const response = client
          ? await updateClient(client.id, formClient)
          : await createClient(formClient);

        setError(response?.error);
      } catch (err) {
        console.error("Error submitting the form:", err);
        setError("An unexpected error occurred.");
      }
    });
  };

  return (
    <Card className="max-w-full w-[95%] md:w-[80%] lg:w-[70%] mx-auto relative">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {client ? "Update Client" : "Add Client"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-4 md:p-6">
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-10"
            >
              <div className="w-full h-full flex pb-12 overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                <div className="w-full flex-none snap-start px-4 flex justify-center">
                  <ClientPartForm />
                </div>
              </div>
              <CardFooter className="flex flex-col gap-4">
                {error && <FormError message={error} />}
                <SubmitButton
                  text={client ? "Update Client" : "Add Client"}
                  isPending={isPending}
                />
              </CardFooter>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ClientForm;
