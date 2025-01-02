"use client";

import { ClientWithAddress } from "@/types/dataTypes";
import { Invoice } from "@prisma/client";

import React, { createContext, useContext } from "react";

interface dataContextProps {
  clients: ClientWithAddress[];
  invoices: Invoice[];
}
const dataContext = createContext<dataContextProps>({
  clients: [],
  invoices: [],
});

export const useData = () => useContext<dataContextProps>(dataContext);

export const DataProvider = ({
  children,
  clients,
  invoices,
}: {
  children: React.ReactNode;
  clients: ClientWithAddress[];
  invoices: Invoice[];
}) => {
  return (
    <dataContext.Provider value={{ clients, invoices }}>
      {children}
    </dataContext.Provider>
  );
};
