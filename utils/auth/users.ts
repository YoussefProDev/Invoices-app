// import "server-only";
import { db } from "@/lib/db";
import { requireUserSession } from "../hooks";
import { UserWithBusinessDetail } from "@/types/schemasTypes";

//User
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      include: {
        businessDetail: true,
      },
    });
    if (!user) {
      const userSession = await requireUserSession();
    }
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (
  id?: string
): Promise<UserWithBusinessDetail | null> => {
  try {
    if (!id) {
      // If no ID is provided, redirect to the login page
      await requireUserSession();
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        businessDetail: true,
      },
    });

    if (!user) {
      // If user is not found, redirect to the login page
      await requireUserSession();
      return null;
    }

    return user;
  } catch (error) {
    // In case of any error, redirect to the login page
    await requireUserSession();
    return null;
  }
};
// Utility function to check session and handle authorization
export const getUserSession = async () => {
  const userSession = await requireUserSession();
  if (!userSession?.id) {
    throw new Error("Unauthorized or User ID missing");
  }
  return userSession.id;
};
