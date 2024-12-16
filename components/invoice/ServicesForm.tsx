"use client";

import React from "react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ServicesForm = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services", // Nome del campo
  });
  console.log(fields);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome Servizio</TableHead>
            <TableHead>Prezzo</TableHead>
            <TableHead>Azione</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {/* Nome Servizio */}
              <TableCell>
                <Input
                  {...register(`services.${index}.name` as const)}
                  placeholder="Nome Servizio"
                  defaultValue={field.name} // Valore iniziale
                />
              </TableCell>

              {/* Prezzo */}
              <TableCell>
                <Input
                  type="number"
                  {...register(`services.${index}.price` as const)}
                  placeholder="Prezzo"
                  defaultValue={field.price} // Valore iniziale
                />
              </TableCell>

              {/* Azioni */}
              <TableCell>
                <Button variant="destructive" onClick={() => remove(index)}>
                  Rimuovi
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pulsante per aggiungere una riga */}
      <Button type="button" onClick={() => append({ name: "", price: 0 })}>
        Aggiungi Servizio
      </Button>

      {/* Pulsante per inviare i dati */}
      <Button type="submit" className="ml-2">
        Invia
      </Button>
    </div>
  );
};

export default ServicesForm;
