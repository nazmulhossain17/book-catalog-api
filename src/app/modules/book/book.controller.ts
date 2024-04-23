import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const result = await bookService.getAllFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.getDataById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book single fetched successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const bookController = {
  insertIntoDb,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
