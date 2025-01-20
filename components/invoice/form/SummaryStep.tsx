"use client";

import { SubmitButton } from "@/components/SubmitButtons";
import { CardFooter } from "@/components/ui/card";
import { InvoiceType } from "@/types/schemasTypes";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const SummaryStep = () => {
  const { getValues } = useFormContext<InvoiceType>();
  const values = getValues();

  const {
    client: {
      name,
      email,
      codiceDestinatario,
      pecDestinatario,
      codiceFiscale,
      address: { cap, comune, provincia, street },
    },
    date,
    invoiceNumber,
    note,
    regimeFiscale,
    invoiceType,
    status,
  } = values;

  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    // Formatta la data solo lato client per evitare errori di hydration
    if (date) {
      setFormattedDate(format(new Date(date), "M/d/yyyy"));
    }
  }, [date]);

  return (
    <div style={styles.container}>
      <h2>Riepilogo Dati Cliente</h2>

      <ClientSection
        name={name}
        email={email}
        codiceDestinatario={codiceDestinatario}
        pecDestinatario={pecDestinatario}
        codiceFiscale={codiceFiscale}
      />

      <AddressSection
        cap={cap}
        comune={comune}
        provincia={provincia}
        street={street}
      />

      <InvoiceDetailsSection
        date={formattedDate}
        invoiceNumber={invoiceNumber}
        note={note}
        regimeFiscale={regimeFiscale}
        invoiceType={invoiceType}
        status={status}
      />
    </div>
  );
};

// Componente per i dati del cliente
const ClientSection = ({
  name,
  email,
  codiceDestinatario,
  pecDestinatario,
  codiceFiscale,
}: {
  name?: string;
  email?: string;
  codiceDestinatario?: string;
  pecDestinatario?: string;
  codiceFiscale?: string;
}) => (
  <div style={styles.section}>
    <h3>Dati Cliente</h3>
    <p>
      <strong>Nome:</strong> {name || "Non specificato"}
    </p>
    <p>
      <strong>Email:</strong> {email || "Non specificata"}
    </p>
    <p>
      <strong>Codice Destinatario:</strong>{" "}
      {codiceDestinatario || "Non specificato"}
    </p>
    <p>
      <strong>PEC Destinatario:</strong> {pecDestinatario || "Non specificata"}
    </p>
    <p>
      <strong>Codice Fiscale:</strong> {codiceFiscale || "Non specificato"}
    </p>
  </div>
);

// Componente per l'indirizzo
const AddressSection = ({
  cap,
  comune,
  provincia,
  street,
}: {
  cap?: string;
  comune?: string;
  provincia?: string;
  street?: string;
}) => (
  <div style={styles.section}>
    <h3>Indirizzo</h3>
    <p>
      <strong>CAP:</strong> {cap || "Non specificato"}
    </p>
    <p>
      <strong>Comune:</strong> {comune || "Non specificato"}
    </p>
    <p>
      <strong>Provincia:</strong> {provincia || "Non specificata"}
    </p>
    <p>
      <strong>Via:</strong> {street || "Non specificata"}
    </p>
  </div>
);

// Componente per i dettagli della fattura
const InvoiceDetailsSection = ({
  date,
  invoiceNumber,
  note,
  regimeFiscale,
  invoiceType,
  status,
}: {
  date: string;
  invoiceNumber?: string;
  note?: string;
  regimeFiscale?: string;
  invoiceType?: string;
  status?: string;
}) => (
  <div>
    <div style={styles.section}>
      <h3>Dettagli Fattura</h3>
      <p>
        <strong>Data:</strong> {date}
      </p>
      <p>
        <strong>Numero Fattura:</strong> {invoiceNumber || "Non specificato"}
      </p>
      <p>
        <strong>Note:</strong> {note || "Nessuna nota"}
      </p>
      <p>
        <strong>Regime Fiscale:</strong> {regimeFiscale || "Non specificato"}
      </p>
      <p>
        <strong>Tipo di Fattura:</strong> {invoiceType || "Non specificato"}
      </p>
      <p>
        <strong>Status:</strong> {status || "Non specificato"}
      </p>
    </div>
  </div>
);

// Stili
const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  section: {
    marginBottom: "15px",
  },
};

export default SummaryStep;
