"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormMessage } from "@/components/ui/form";
import { Label } from "../ui/label";
import { ServiceType } from "@/types/schemasTypes";
import { ServiceSchema } from "@/schemas";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ivaOptions, natureOptions } from "@/data/invoices";
import { z } from "zod";

// Stato iniziale del form
const initialState: Partial<ServiceType> = {
  description: "",
  quantity: 0,
  pricePerUnit: 0,
  // ivaRate: 0,
  totalPrice: 0,
  nature: "",
};
// Utility per mappare gli errori di Zod
const mapZodErrors = (errors: z.ZodIssue[]): Record<string, string> => {
  return errors.reduce(
    (acc, error) => {
      const field = error.path[0] as string; // Nome del campo
      acc[field] = error.message; // Messaggio di errore
      return acc;
    },
    {} as Record<string, string>
  );
};
export const ServiceForm = ({
  handleAddService,
  setOpenSheet,
}: {
  handleAddService: (service: ServiceType) => void;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<Partial<ServiceType>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calcolo automatico del prezzo totale
  useEffect(() => {
    const quantity = formData.quantity ?? 0;
    const pricePerUnit = formData.pricePerUnit ?? 0;
    const ivaRate = formData.ivaRate ?? 0;

    const basePrice = quantity * pricePerUnit;
    const ivaMultiplier = ivaRate / 100;
    const total = basePrice * (1 + ivaMultiplier);

    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.quantity, formData.pricePerUnit, formData.ivaRate]);

  // Gestione del cambiamento dei campi di input
  const handleChange = (field: keyof ServiceType, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "ivaRate" && value !== 0 ? { nature: "" } : {}),
    }));
  };

  // Funzione per aggiungere un servizio
  const addService = () => {
    // Validazione dello schema
    const validationResult = ServiceSchema.safeParse(formData);

    if (!validationResult.success) {
      // Estrarre errori di validazione
      const validationErrors = mapZodErrors(validationResult.error.errors);

      // Aggiornare lo stato con gli errori
      setErrors(validationErrors);
      return;
    }

    // Se la validazione ha successo, aggiungere il servizio
    handleAddService(validationResult.data);

    // Ripristinare lo stato degli errori e chiudere il pannello
    setErrors({});
    setOpenSheet(false);
  };

  // Interfaccia del form
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dettagli del Servizio</h2>

        {/* Descrizione */}
        <div>
          <Label htmlFor="description">Descrizione</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Inserisci una descrizione"
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <FormMessage className="text-red-500">
              {errors.description}
            </FormMessage>
          )}
        </div>

        {/* Quantità */}
        <div>
          <Label htmlFor="quantity">Quantità</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            placeholder="Inserisci la quantità"
            className={errors.quantity ? "border-red-500" : ""}
          />
          {errors.quantity && (
            <FormMessage className="text-red-500">
              {errors.quantity}
            </FormMessage>
          )}
        </div>

        {/* Prezzo Unitario */}
        <div>
          <Label htmlFor="pricePerUnit">Prezzo Unitario</Label>
          <Input
            id="pricePerUnit"
            type="number"
            value={formData.pricePerUnit}
            onChange={(e) =>
              handleChange("pricePerUnit", Number(e.target.value))
            }
            placeholder="Inserisci il prezzo unitario"
            className={errors.pricePerUnit ? "border-red-500" : ""}
          />
          {errors.pricePerUnit && (
            <FormMessage className="text-red-500">
              {errors.pricePerUnit}
            </FormMessage>
          )}
        </div>

        {/* Aliquota IVA */}
        <div>
          <Label htmlFor="ivaRate">Aliquota IVA</Label>
          <Select
            onValueChange={(value) => handleChange("ivaRate", Number(value))}
            value={formData.ivaRate?.toString() || ""}
          >
            <SelectTrigger
              id="ivaRate"
              className={errors.ivaRate ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Seleziona l'aliquota IVA" />
            </SelectTrigger>
            <SelectContent>
              {ivaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.ivaRate && (
            <FormMessage className="text-red-500">{errors.ivaRate}</FormMessage>
          )}
        </div>

        {/* Natura */}
        <div>
          <Label htmlFor="nature">Natura</Label>
          <Select
            disabled={formData.ivaRate !== 0}
            onValueChange={(value) => handleChange("nature", value)}
            value={formData.nature || ""}
          >
            <SelectTrigger
              id="nature"
              className={errors.nature ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Seleziona la natura" />
            </SelectTrigger>
            <SelectContent>
              {natureOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.nature && (
            <FormMessage className="text-red-500">{errors.nature}</FormMessage>
          )}
        </div>

        {/* Prezzo Totale */}
        <div>
          <Label htmlFor="totalPrice">Prezzo Totale</Label>
          <Input
            id="totalPrice"
            type="text"
            value={(formData.totalPrice ?? 0).toFixed(2)}
            readOnly
            placeholder="Calcolato automaticamente"
            className={errors.totalPrice ? "border-red-500" : ""}
          />
          {errors.totalPrice && (
            <FormMessage className="text-red-500">
              {errors.totalPrice}
            </FormMessage>
          )}
        </div>
      </div>

      {/* Bottoni di Azione */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setFormData(initialState)}
        >
          Resetta
        </Button>
        <Button type="button" onClick={addService}>
          Conferma
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
