import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDb = async (data: Category) => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      books: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

export const categoryService = {
  insertIntoDb,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
