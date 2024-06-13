import { Router } from "express";
import prisma from "../config/prisma";
import { UserRequest } from "../types";
import ApiResponse from "../utils/ApiResponse";
import { handleErrorResponse } from "../utils/errorHandler";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  /* #swagger.tags = ['User'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const users = await prisma.user.findMany();
    res
      .status(200)
      .json(new ApiResponse(users, "Users fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

userRouter.get("/me", async (req: UserRequest, res) => {
  /* #swagger.tags = ['User'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(null, "User not found", false));
    res
      .status(200)
      .json(new ApiResponse(user, "User fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

userRouter.get("/:id", async (req, res) => {
  /* #swagger.tags = ['User'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(null, "User not found", false));
    res
      .status(200)
      .json(new ApiResponse(user, "User fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

userRouter.put("/:id", async (req, res) => {
  /* #swagger.tags = ['User'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const { email, fullName, phoneNumber } = req.body;
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email,
        fullName,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(user, "User updated successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

userRouter.delete("/:id", async (req, res) => {
  /* #swagger.tags = ['User'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(null, "User deleted successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

export default userRouter;
