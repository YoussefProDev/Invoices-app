"use client";
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import ServiceForm from "./ServiceForm";
import { ServicesType, ServiceType } from "@/types/schemasTypes";

const ServicesTable = () => {
  const { control } = useFormContext<{
    services: ServicesType;
  }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const handleAddService = (service: ServiceType) => {
    append(service);
  };

  return (
    <div className="space-y-4">
      {/* Tabella dei servizi */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrizione</TableHead>
            <TableHead>Quantità</TableHead>
            <TableHead>Prezzo Unitario</TableHead>
            <TableHead>Aliquota IVA</TableHead>
            <TableHead>Natura</TableHead>
            <TableHead>Prezzo Totale</TableHead>
            <TableHead>Azioni</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>{field.description}</TableCell>
              <TableCell>{field.quantity}</TableCell>
              <TableCell>{field.pricePerUnit}</TableCell>
              <TableCell>{field.ivaRate}</TableCell>
              <TableCell>{field.nature}</TableCell>
              <TableCell>{field.totalPrice}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => remove(index)}>
                  Rimuovi
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sheet per aggiungere un nuovo servizio */}
      <Sheet>
        <SheetTrigger asChild>
          <Button type="button">Aggiungi Servizio</Button>
        </SheetTrigger>

        <SheetContent className=" w-[400px] sm:w-[540px] ">
          <SheetHeader>
            <SheetTitle>Nuovo Servizio</SheetTitle>
          </SheetHeader>
          <ServiceForm handleAddService={handleAddService} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ServicesTable;
