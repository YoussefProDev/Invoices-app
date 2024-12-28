"use client";
import { InvoiceType } from "@/types/schemasTypes";
import React from "react";
import { useFormContext } from "react-hook-form";

const SummaryStep = () => {
  const { getValues } = useFormContext<InvoiceType>();
  const values = getValues();
  if (!!values) return <div>ciao</div>;
  console.log(values);

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
  return (
    <div style={styles.container}>
      <h2>Riepilogo Dati Cliente</h2>
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
          <strong>PEC Destinatario:</strong>{" "}
          {pecDestinatario || "Non specificata"}
        </p>
        <p>
          <strong>Codice Fiscale:</strong> {codiceFiscale || "Non specificato"}
        </p>
      </div>

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

      <div style={styles.section}>
        <h3>Dettagli Fattura</h3>
        <p>
          <strong>Data:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p>
          <strong>Numero Fattura:</strong> {invoiceNumber || "Non specificato"}
        </p>
        <p>
          <strong>Note:</strong> {note || "Nessuna nota"}
        </p>
        <p>
          <strong>Regime Fiscale:</strong> {regimeFiscale}
        </p>
        <p>
          <strong>Tipo di Fattura:</strong> {invoiceType}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>
    </div>
  );
};

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
