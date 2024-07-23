import type { Request, Response } from "express";

import User from "@/models/user.model";
import userValidator from "@/validators/user.validator";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.json({
      message: `${users.length} Found`,
      data: users,
    });
  } catch (error) {
    console.log("[GET_USERS]: ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await User.find({ $or: [{ name }, { email }] });

    if (!user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const result = userValidator.safeParse({ name, email });
    const errors = result.error?.flatten();

    if (errors?.fieldErrors.name) {
      return res.status(400).json({
        message: errors?.fieldErrors.name[0],
      });
    }

    if (errors?.fieldErrors.email) {
      return res.status(400).json({
        message: errors?.fieldErrors.email[0],
      });
    }

    const createdUser = await User.create(result.data);

    return res.json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log("[CREATE_USER]: ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.log("[GET_USER]: ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = userValidator.partial().safeParse({ name, email });
    const errors = result.error?.flatten();

    if (errors?.fieldErrors.name) {
      return res.status(400).json({
        message: errors?.fieldErrors.name[0],
      });
    }

    if (errors?.fieldErrors.email) {
      return res.status(400).json({
        message: errors?.fieldErrors.email[0],
      });
    }

    const user = await User.findByIdAndUpdate(id, result.data);

    if (!user) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.json({
      message: "User edited successfully",
      data: user,
    });
  } catch (error) {
    console.log("[EDIT_USER]: ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log("[DELETE_USER]: ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
