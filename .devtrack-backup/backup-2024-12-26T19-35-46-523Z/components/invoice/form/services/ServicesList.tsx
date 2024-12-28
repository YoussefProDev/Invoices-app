import React, { useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IoMdRemoveCircle } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ServiceForm from "./ServiceForm";
import { InvoiceType, ServiceType } from "@/types/schemasTypes";
import { Field } from "@/types/dataTypes";
import { DynamicTable } from "@/components/DynamicTable";
import { FaEdit } from "react-icons/fa";
import { PlusIcon } from "lucide-react";

const ServicesTable = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [edit, setEdit] = useState<{
    status: boolean;
    index?: number;
    serviceToUpdate?: ServiceType;
  }>({
    status: false,
  });

  const { control, setValue } = useFormContext<InvoiceType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Funzione per aggiungere un nuovo servizio
  const handleAddService = (service: ServiceType) => {
    append(service);
  };

  // Funzione per aggiornare un servizio
  const handleUpdateService = (service: ServiceType) => {
    if (edit.index !== undefined) {
      // Sostituire il servizio all'indice specificato nell'array
      const updatedServices = [...fields];
      updatedServices[edit.index] = {
        ...updatedServices[edit.index],
        ...service,
      };
      setValue("services", updatedServices);

      setOpenSheet(false); // Chiudi la finestra del modulo
      setEdit({ status: false }); // Reset dello stato di modifica
    }
  };

  // Campi della tabella per i servizi
  const serviceFields: Field<ServiceType>[] = [
    {
      label: "Descrizione",
      key: "description",
      sticky: true,
      format: (value) =>
        value?.length > 30 ? (
          <>
            {value.substring(0, 30)}...
            <Button variant="link" onClick={() => alert(`Dettagli: ${value}`)}>
              Dettagli
            </Button>
          </>
        ) : (
          value
        ),
    },
    { label: "Quantità", key: "quantity" },
    { label: "Prezzo Unitario", key: "pricePerUnit" },
    { label: "Aliquota IVA", key: "ivaRate" },
    { label: "Natura", key: "nature" },
    {
      label: "Prezzo Totale",
      key: "totalPrice",
      format: (value: string) => (+value).toFixed(2),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Contenitore tabella responsiva */}
      <div className="space-y-2">
        <DynamicTable<ServiceType>
          data={fields}
          fields={serviceFields}
          renderActions={(service, index) => (
            <div className="flex">
              <FaEdit
                size={25}
                onClick={() => {
                  setOpenSheet(true);
                  setEdit({ status: true, serviceToUpdate: service, index });
                }}
              />
              <IoMdRemoveCircle size={25} onClick={() => remove(index)} />
            </div>
          )}
          emptyState={{
            title: "No Services found",
            description: "Add a Service to get started",
            buttonText: "Add Service",
            action: () => {
              setOpenSheet(true);
            },
          }}
          customComponent={
            <Button
              type="button"
              onClick={() => setOpenSheet(true)}
              className=" w-full"
            >
              <PlusIcon /> Add Service
            </Button>
          }
        />
      </div>

      {/* Sheet per aggiungere un nuovo servizio o aggiornare un servizio esistente */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle>
              {edit.status ? "Modifica Servizio" : "Nuovo Servizio"}
            </SheetTitle>
          </SheetHeader>
          <ServiceForm
            handleAddService={handleAddService}
            setOpenSheet={setOpenSheet}
            handleUpdateService={handleUpdateService}
            serviceToUpdate={edit.serviceToUpdate}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ServicesTable;
