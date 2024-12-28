"use client";

import { ClientWithAddress } from "@/types/dataTypes";

import React, { createContext, useContext } from "react";

const clientContext = createContext<ClientWithAddress[]>([]);

export const useClients = () => useContext<ClientWithAddress[]>(clientContext);

export const ClientProvider = ({
  children,
  clients,
}: {
  children: React.ReactNode;
  clients: ClientWithAddress[];
}) => {
  return (
    <clientContext.Provider value={clients}>{children}</clientContext.Provider>
  );
};
