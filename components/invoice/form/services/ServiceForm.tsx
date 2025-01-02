"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ServiceType } from "@/types/schemasTypes";
import { ServiceSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ivaLabels, ivaOptions, natureOptions } from "@/data/invoices";
import { z } from "zod";

// Stato iniziale del form
const initialState: Partial<ServiceType> = {
  description: "",
  quantity: 0,
  pricePerUnit: 0,
  totalPrice: 0,

  nature: "",
};

const mapZodErrors = (errors: z.ZodIssue[]): Record<string, string> => {
  return errors.reduce(
    (acc, error) => {
      const field = error.path[0] as string;
      acc[field] = error.message;
      return acc;
    },
    {} as Record<string, string>
  );
};

export const ServiceForm = ({
  handleAddService,
  handleUpdateService,
  setOpenSheet,
  serviceToUpdate,
}: {
  handleAddService: (service: ServiceType) => void;
  handleUpdateService: (service: ServiceType) => void;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  serviceToUpdate?: ServiceType; // Prop per il servizio da aggiornare
}) => {
  const [formData, setFormData] = useState<Partial<ServiceType>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Se `serviceToUpdate` è presente, pre-compiliamo il form con i dati esistenti
  useEffect(() => {
    if (serviceToUpdate) {
      setFormData(serviceToUpdate); // Pre-compilazione del form con i dati esistenti
    }
  }, [serviceToUpdate]);

  // Calcolo automatico del prezzo totale
  useEffect(() => {
    const quantity = formData.quantity ?? 0;
    const pricePerUnit = formData.pricePerUnit ?? 0;
    const ivaRate =
      ivaOptions.find((ivaOption) => ivaOption.label === formData.ivaRate)
        ?.value ?? 0;

    const basePrice = quantity * pricePerUnit;
    const ivaMultiplier = ivaRate / 100;
    const total = basePrice * (1 + ivaMultiplier);

    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.quantity, formData.pricePerUnit, formData.ivaRate]);

  const handleChange = (field: keyof ServiceType, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "ivaRate" && value !== "0%" ? { nature: "" } : {}),
    }));
  };

  const submitService = () => {
    const validationResult = ServiceSchema.safeParse(formData);

    if (!validationResult.success) {
      const validationErrors = mapZodErrors(validationResult.error.errors);
      setErrors(validationErrors);
      return;
    }

    if (serviceToUpdate) {
      // Se stiamo aggiornando un servizio
      handleUpdateService(validationResult.data);
    } else {
      // Se stiamo creando un nuovo servizio
      handleAddService(validationResult.data);
    }

    setErrors({});
    setOpenSheet(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {serviceToUpdate ? "Modifica Servizio" : "Dettagli del Servizio"}
        </h2>

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

        <div>
          <Label htmlFor="ivaRate">Aliquota IVA</Label>
          <Select
            onValueChange={(value) => handleChange("ivaRate", value)}
            value={formData.ivaRate}
          >
            <SelectTrigger
              id="ivaRate"
              className={errors.ivaRate ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Seleziona l'aliquota IVA" />
            </SelectTrigger>
            <SelectContent>
              {ivaLabels.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.ivaRate && (
            <FormMessage className="text-red-500">{errors.ivaRate}</FormMessage>
          )}
        </div>

        <div>
          <Label htmlFor="nature">Natura</Label>
          <Select
            disabled={formData.ivaRate !== "0%"}
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

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setFormData(initialState)}
        >
          Resetta
        </Button>
        <Button type="button" onClick={submitService}>
          {serviceToUpdate ? "Aggiorna" : "Conferma"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
