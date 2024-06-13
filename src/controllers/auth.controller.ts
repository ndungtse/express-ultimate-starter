import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import ApiResponse from "../utils/ApiResponse";
import { handleErrorResponse } from "../utils/errorHandler";
import { registerSchema } from "../validations/schemas";

const AuthRouter = Router();

AuthRouter.post("/register", async (req, res) => {
  /*
    #swagger.tags = ['Auth']
     */
  try {
    await registerSchema.parseAsync(req.body);
    const { email, password, fullName } = req.body;
    // if (!email || !password || !fullName)
    //   return res.status(400).json({ message: "Please fill all fields" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    });
    res
      .status(201)
      .json(new ApiResponse(user, "User created successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

AuthRouter.post("/login", async (req, res) => {
  /*
  #swagger.tags = ['Auth']
    */
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all fields" });
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET!
    );
    res
      .status(200)
      .json(
        new ApiResponse({ user, token }, "User logged in successfully", true)
      );
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

export default AuthRouter;
