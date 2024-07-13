import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UserService from "./user.service";

class userController {
	private userService = new UserService();

	public getUsers = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const getUserResponse = await this.userService.getUsers();
			res.status(getUserResponse.code).json(getUserResponse);
		}
	);

	public createUsers = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const { first_name, last_name, email, password } = req.body;

			const registerResponse = await this.userService.createUser(
				first_name,
				last_name,
				email,
				password
			);
			res.status(registerResponse.code).json(registerResponse);
		}
	);

	public login = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const { email, password } = req.body;
			const loginResponse = await this.userService.login(email, password);

			res.status(loginResponse.code).json(loginResponse);
		}
	);
}

export default userController;
