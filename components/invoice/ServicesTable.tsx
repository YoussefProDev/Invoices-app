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
      {/* Contenitore tabella responsiva */}
      <div className="overflow-x-auto snap-x snap-mandatory flex">
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
              <TableHead className="snap-center">Quantità</TableHead>
              <TableHead className="snap-center">Prezzo Unitario</TableHead>
              <TableHead className="snap-center">Aliquota IVA</TableHead>
              <TableHead className="snap-center">Natura</TableHead>
              <TableHead className="snap-center">Prezzo Totale</TableHead>
              <TableHead className="snap-center">Azioni</TableHead>
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
                <TableCell className="snap-center">{field.quantity}</TableCell>
                <TableCell className="snap-center">
                  {field.pricePerUnit}
                </TableCell>
                <TableCell className="snap-center">{field.ivaRate}</TableCell>
                <TableCell className="snap-center">{field.nature}</TableCell>
                <TableCell className="snap-center">
                  {field.totalPrice}
                </TableCell>
                <TableCell className="snap-center">
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
      <Sheet>
        <SheetTrigger asChild>
          <Button type="button">Aggiungi Servizio</Button>
        </SheetTrigger>

        <SheetContent className="w-[90%] max-w-[540px]">
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
