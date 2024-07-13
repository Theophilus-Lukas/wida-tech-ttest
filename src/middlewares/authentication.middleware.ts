import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "@api/user/user.model";
import dotenv from "dotenv";
dotenv.config();

const jwt = require("jsonwebtoken");

export const authenticate = asyncHandler(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		let token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			res.status(403).send({ message: "NO_TOKEN_PROVIDED" });
		}

		jwt.verify(token, `${process.env.JWT_SECRET_KEY}`),
			(err: Error, decoded: { id: string }) => {
				if (err) {
					res.status(401).send({ message: "UNAUTHENTICATED_USER" });
				}

				const user = User.findOne({
					where: {
						id: decoded.id,
					},
				});
			};
		next();
	}
);
