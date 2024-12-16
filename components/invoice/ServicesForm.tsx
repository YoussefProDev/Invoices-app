import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
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
import { z } from "zod";
import { ServicesSchema } from "@/schemas";

const ServicesForm = () => {
  const { control, getValues } = useFormContext<{
    services: z.infer<typeof ServicesSchema>;
  }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services", // Nome del campo per i servizi
  });

  const handleAddService = (data: any) => {
    append(data); // Aggiungi il servizio all'array
  };

  return (
    <div className="space-y-4">
      {/* Tabella dei servizi aggiunti */}
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

        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Nuovo Servizio</SheetTitle>
          </SheetHeader>

          {/* Form per i dettagli del nuovo servizio */}
          <div className="space-y-2">
            <FormField
              name={`services.${fields.length}.description`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Descrizione" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name={`services.${fields.length}.quantity`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantità</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Quantità" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name={`services.${fields.length}.pricePerUnit`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prezzo Unitario</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Prezzo Unitario"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name={`services.${fields.length}.ivaRate`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aliquota IVA</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Aliquota IVA"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name={`services.${fields.length}.nature`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Natura</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Natura" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name={`services.${fields.length}.totalPrice`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prezzo Totale</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Prezzo Totale"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => {
                console.log(getValues().services);

                // handleAddService(fields[fields.length]);
              }}
            >
              Aggiungi Servizio
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ServicesForm;
