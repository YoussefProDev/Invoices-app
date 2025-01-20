"use server";

import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PAGE } from "@/routes";
import { onBoardingSchema } from "@/schemas";
import { OnBoardingType } from "@/types/schemasTypes";
import { requireUserSession } from "@/utils/hooks";
import { addressMapper } from "@/utils/mappers/address";
import { redirect } from "next/navigation";
import { z } from "zod";

export const onBoarding = async (formData: OnBoardingType) => {
  // Validazione dei dati del form
  const validatedFields = onBoardingSchema.safeParse(formData);
  if (!validatedFields.success) {
    // Restituisci un errore se la validazione fallisce
    return {
      error: "Invalid information. Please check the fields and try again.",
    };
  }

  const { companyName, pec, taxCode, vatNumber, address } =
    validatedFields.data;
  let success = false;
  try {
    // Verifica della sessione utente
    const userSession = await requireUserSession();
    if (!userSession) {
      // Se la sessione non esiste o l'utente non è presente, redirigi al login
      redirect(LOGIN_PAGE);
    }

    const { id } = userSession;
    // Aggiornamento dei dettagli aziendali nel database
    const userAddress = addressMapper(address);
    await db.user.update({
      where: { id },
      data: {
        businessDetail: {
          upsert: {
            create: {
              companyName,
              pec,
              taxCode,
              vatNumber,
              address: userAddress,
            },
            update: {
              companyName,
              pec,
              taxCode,
              vatNumber,
              address: userAddress,
            },
          },
        },
      },
    });
    success = true;
    return { success };
  } catch (error) {
    console.error("Error updating user details:", error);
    // Restituisci un errore se si verifica un problema nell'aggiornamento dei dettagli
    return { error: "An unexpected error occurred. Please try again later." };
  } finally {
    // Reindirizzamento dopo l'aggiornamento se ha avuto successo

    if (success) redirect(DEFAULT_LOGIN_REDIRECT);
  }
};
