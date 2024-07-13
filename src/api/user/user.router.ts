import { Router } from "express";
import userController from "./user.controller";
import { authenticate } from "@middlewares/authentication.middleware";

class userRoute {
	public path = "/user";
	public router = Router();
	public userController = new userController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			`${this.path}/all`,
			authenticate,
			this.userController.getUsers
		);
		this.router.post(
			`${this.path}/create`,
			// middleware,
			this.userController.createUsers
		);
		this.router.post(
			`${this.path}/login`,
			// middleware,
			this.userController.login
		);
	}
}
export default userRoute;
