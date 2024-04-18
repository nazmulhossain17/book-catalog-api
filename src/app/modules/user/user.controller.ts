import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import sendResponse from "../../../shared/sendResponse";
import prisma from "../../../shared/prisma";
import { comparePasswords, hashPassword } from "../../../shared/bcryptUtils";
import { secretConfig } from "../../../config";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, contactNo, address, profileImg } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !contactNo ||
      !address ||
      !profileImg
    ) {
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
      return res.status(400).json({
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
        role,
        address,
        profileImg,
      },
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Calculate expiration time
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const expirationTime = now + 365 * 24 * 60 * 60; // 1 year in seconds

    // Generate JWT token with custom expiration time
    const token = jwt.sign(
      { role: user.role, userId: user.id, iat: expirationTime },
      secretConfig.secret!
    );

    return res
      .status(200)
      .json({ success: true, message: "User signin successfully!", token });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const logoutUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User getched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.user.delete({
      where: {
        id,
      },
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User deleted successfully",
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
  loginUser,
  logoutUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
