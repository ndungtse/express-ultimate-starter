import { Request, Response } from "express";

export const getApp = async (req: Request, res: Response) => {
  res.send("Hello World");
};

