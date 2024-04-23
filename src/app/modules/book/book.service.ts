import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interface/common";

const insertIntoDb = async (data: Book) => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<Book[]>> => {
  const result = await prisma.book.findMany();
  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page: 1,
      limit: 10,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookService = {
  insertIntoDb,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
