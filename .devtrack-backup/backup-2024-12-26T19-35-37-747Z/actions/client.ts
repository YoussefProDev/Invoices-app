"use server";

import { db } from "@/lib/db";
import { ClientSchema } from "@/schemas";
import { ClientType } from "@/types/schemasTypes";
import { getUserSession } from "@/utils/auth/users";
import { revalidatePath } from "next/cache";

// Function to create a client
export const createClient = async (clientForm: ClientType) => {
  const validatedFields = ClientSchema.safeParse(clientForm);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields in the form!",
      details: validatedFields.error.format(),
    };
  }

  try {
    const userId = await getUserSession(); // Ensure userId is always valid

    const {
      name,
      codiceDestinatario,
      pecDestinatario,
      email,
      address,
      codiceFiscale,
    } = validatedFields.data;

    const client = await db.client.create({
      data: {
        name,
        codiceDestinatario,
        pecDestinatario,
        codiceFiscale,
        email,
        user: {
          connect: { id: userId },
        },
        address: {
          create: { ...address },
        },
      },
      include: { address: true },
    });

    return { data: client };
  } catch (error) {
    console.log("Error creating client:", error);
    return {
      error: "An error occurred while creating the client.",
    };
  }
};

// Function to update a client
export const updateClient = async (clientId: string, formData: ClientType) => {
  const validatedFields = ClientSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields in the form!",
      details: validatedFields.error.format(),
    };
  }
  try {
    const userId = await getUserSession(); // Ensure userId is always valid

    const {
      name,
      codiceDestinatario,
      pecDestinatario,
      email,
      address,
      codiceFiscale,
    } = validatedFields.data;
    const client = await db.client.update({
      where: { id: clientId },
      data: {
        name,
        codiceDestinatario,
        pecDestinatario,
        codiceFiscale,
        email,
        address: {
          update: { ...address },
        },
      },
    });

    return { data: client };
  } catch (error) {
    console.error("Error updating client:", error);
    return {
      error: "An error occurred while updating the client.",
    };
  }
};

// Function to delete a client
export const deleteClient = async (clientId: string) => {
  try {
    const client = await db.client.delete({
      where: { id: clientId },
    });
    revalidatePath("/clients");
    return { data: client };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      error: "An error occurred while deleting the client.",
    };
  }
};
