import { db } from "@/lib/db";
import { requireUser } from "../hooks";

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
    if (!user) return null;
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
        businessDetail: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
// Utility function to check session and handle authorization
export const getUserSession = async () => {
  const session = await requireUser();
  if (!session?.user?.id) {
    throw new Error("Unauthorized or User ID missing");
  }
  return session.user.id;
};
