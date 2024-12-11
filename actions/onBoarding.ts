"use server";

import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PAGE } from "@/routes";
import { onBoardingSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/auth/users";
import { requireUser } from "@/utils/hooks";
import { redirect } from "next/navigation";
import { z } from "zod";

export const onBoarding = async (
  formData: z.infer<typeof onBoardingSchema>
) => {
  // Validazione dei dati del form
  const validatedFields = onBoardingSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      error: "Invalid information. Please check the fields and try again.",
    };
  }

  const {
    companyName,
    pec,
    taxCode,
    vatNumber,
    address: { cap, comune, number, provincia, street },
  } = validatedFields.data;

  // Verifica della sessione utente
  const session = await requireUser();
  if (!session || !session.user) {
    redirect(LOGIN_PAGE);
  }

  const { id } = session.user;
  let success = false;
  try {
    // Aggiornamento dei dettagli aziendali
    await db.user.update({
      where: { id },
      data: {
        BusinessDetail: {
          upsert: {
            create: {
              companyName,
              pec,
              taxCode,
              vatNumber,
              address: {
                create: {
                  cap,
                  comune,
                  number,
                  provincia,
                  street,
                },
              },
            },
            update: {
              companyName,
              pec,
              taxCode,
              vatNumber,
              address: {
                update: {
                  cap,
                  comune,
                  number,
                  provincia,
                  street,
                },
              },
            },
          },
        },
      },
    });
    success = true;
  } catch (error) {
    console.error("Error updating user details:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  } finally {
    if (success) {
      // Redirect al percorso predefinito dopo il login
      redirect(DEFAULT_LOGIN_REDIRECT);
    }
  }
};
