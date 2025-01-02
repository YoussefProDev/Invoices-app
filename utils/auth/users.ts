// import "server-only";
import { db } from "@/lib/db";
import { requireUserSession } from "../hooks";

//User
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      include: {
        businessDetail: {
          include: {
            address: true,
          },
        },
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

export const getUserById = async (id?: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        businessDetail: {
          include: {
            address: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
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
