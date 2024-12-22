"use client";
import React, { useState } from "react";
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
  const [openSheet, setOpenSheet] = useState(false);
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
      {/* Contenitore tabella responsiva */}
      <div className="flex">
        <Table className="min-w-[700px] table-auto border-collapse">
          <TableHeader>
            <TableRow>
              {/* Colonna fissa */}
              <TableHead
                className="sticky left-0 bg-white z-10 shadow-sm"
                style={{ minWidth: "150px" }}
              >
                Descrizione
              </TableHead>
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
                {/* Prima colonna fissa */}
                <TableCell className="sticky left-0 bg-white z-10 shadow-sm truncate max-w-[150px]">
                  {field.description?.length > 30 ? (
                    <>
                      {field.description.substring(0, 30)}...
                      <Button
                        variant="link"
                        onClick={() => {
                          alert(`Dettagli: ${field.description}`);
                        }}
                      >
                        Dettagli
                      </Button>
                    </>
                  ) : (
                    field.description
                  )}
                </TableCell>
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
      </div>

      {/* Sheet per aggiungere un nuovo servizio */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button type="button">Aggiungi Servizio</Button>
        </SheetTrigger>

        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle>Nuovo Servizio</SheetTitle>
          </SheetHeader>
          <ServiceForm
            handleAddService={handleAddService}
            setOpenSheet={setOpenSheet}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ServicesTable;
