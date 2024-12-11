import { db } from "@/lib/db";

//User
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      include: {
        BusinessDetail: true,
      },
    });
    if (!user) return null;
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        BusinessDetail: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
