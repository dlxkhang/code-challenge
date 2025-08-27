import { Request, Response } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export const handleError = (res: Response, error: CustomError): void => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Internal Server Error";

  res.status(statusCode).json({
    error: message,
  });
};
