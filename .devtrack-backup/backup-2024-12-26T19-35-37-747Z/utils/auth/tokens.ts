import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
//VerifacationToken
export const getVerifacationTokenByEmail = async (email: string) => {
  try {
    const verifacationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verifacationToken;
  } catch (error) {
    return null;
  }
};

//VerifacationToken
export const getVerifacationTokenByToken = async (token: string) => {
  try {
    const verifacationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return verifacationToken;
  } catch (error) {
    return null;
  }
};

export const generateVerifacationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerifacationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verifacationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verifacationToken;
};
