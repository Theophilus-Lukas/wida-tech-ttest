import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

export const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Masuk Middleware")
        next();
    }
)