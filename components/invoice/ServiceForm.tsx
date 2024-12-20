"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormMessage } from "@/components/ui/form"; // Assuming this is where FormMessage is imported from
import { Label } from "../ui/label";
import { ServiceType } from "@/types/schemasTypes";
import { ServiceSchema } from "@/schemas";
import { Textarea } from "../ui/textarea";

export const ServiceForm = ({
  handleAddService,
}: {
  handleAddService: (service: ServiceType) => void;
}) => {
  const [formData, setFormData] = useState<ServiceType>({
    description: "descrizione",
    quantity: 3,
    pricePerUnit: 3,
    ivaRate: 4,
    nature: "descrizione",
    totalPrice: 22,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gestione del cambiamento dei campi di input
  const handleChange = (field: keyof ServiceType, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Funzione per aggiungere un servizio alla lista
  const addService = () => {
    const validationResult = ServiceSchema.safeParse(formData);

    if (!validationResult.success) {
      const validationErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        validationErrors[field] = error.message;
      });

      setErrors(validationErrors);
      return;
    }

    handleAddService({ ...validationResult.data });

    setErrors({});
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">Dettagli del Servizio</legend>

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
          <Input
            id="ivaRate"
            type="number"
            value={formData.ivaRate}
            onChange={(e) => handleChange("ivaRate", Number(e.target.value))}
            placeholder="Inserisci l'aliquota IVA"
            className={errors.ivaRate ? "border-red-500" : ""}
          />
          {errors.ivaRate && (
            <FormMessage className="text-red-500">{errors.ivaRate}</FormMessage>
          )}
        </div>

        <div>
          <Label htmlFor="nature">Natura</Label>
          <Input
            id="nature"
            value={formData.nature}
            onChange={(e) => handleChange("nature", e.target.value)}
            placeholder="Inserisci la natura del servizio"
            className={errors.nature ? "border-red-500" : ""}
          />
          {errors.nature && (
            <FormMessage className="text-red-500">{errors.nature}</FormMessage>
          )}
        </div>

        <div>
          <Label htmlFor="totalPrice">Prezzo Totale</Label>
          <Input
            id="totalPrice"
            type="number"
            value={formData.totalPrice}
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
      </fieldset>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            setFormData({
              description: "",
              quantity: 0,
              pricePerUnit: 0,
              ivaRate: 0,
              nature: "",
              totalPrice: 0,
            })
          }
        >
          Resetta
        </Button>
        <Button type="button" onClick={addService}>
          Conferma
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
