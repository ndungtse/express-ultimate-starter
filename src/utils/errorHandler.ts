import { ZodError } from "zod";
import ApiResponse from "./ApiResponse";
import status from "http-status";
import {Response} from 'express'

export const getErrorMessage = (error: any) => {
  console.log(error instanceof ZodError);

  // zod error
  if (error instanceof ZodError) {
    return error.errors
      .map((err) => err.message)
      .join(", ");
  }

  if (error instanceof Error) {
    return error.message;
  }

  return error;
};

export const handleErrorResponse = (res: Response, error: any, code: string | number = status.INTERNAL_SERVER_ERROR) => {
    if (error instanceof ZodError) {
        code = status.BAD_REQUEST;
    }
    const message = getErrorMessage(error);

    return res.status(Number(code))
    .json(
      new ApiResponse(null, message, false)
    );
}