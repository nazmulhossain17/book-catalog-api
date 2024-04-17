import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../../shared/bcryptUtils";

const insertIntoDB = async (data: User) => {
  const hashedPassword = await hashPassword(data.password);
  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword, // Replace the original password with the hashed one
    },
  });
  return result;
};

export const userService = {
  insertIntoDB,
};
