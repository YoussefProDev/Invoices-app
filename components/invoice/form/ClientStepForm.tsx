"use client";
import React, { useState } from "react";

import ClientPartForm from "@/components/client/ClientPartForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClientList } from "@/components/client/ClientList";
import { FieldsType } from "@/types/dataTypes";
import { Client } from "@prisma/client";
import { ClientTypeWithId } from "@/types/schemasTypes";

const ClientStepForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [client, setClient] = useState<ClientTypeWithId>();
  const fields: FieldsType<ClientTypeWithId> = [
    { label: "Client Name", key: "name", sticky: true },
    {
      label: "Email",
      key: "email",
      format: (value: string | null) => value || "N/A",
    },
    {
      label: "Pec",
      key: "pecDestinatario",
      format: (value: string | null) => value || "N/A",
    },
  ];
  const updateClientFields = (clientRow: ClientTypeWithId) => {
    setClient(clientRow);
    setOpenDialog(false);
  };
  return (
    <div className="space-y-4 flex flex-col items-center">
      <ClientPartForm campo="client" client={client} />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button type="button" className="">
            Load Client From List
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose A Client</DialogTitle>
          </DialogHeader>

          <ClientList fields={fields} onClick={updateClientFields} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientStepForm;
