import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../../shared/bcryptUtils";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, contactNo, address, profileImg } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists",
        });
    }
    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        contactNo,
        address,
        profileImg,
      },
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const userController = {
  createUser,
};
