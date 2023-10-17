import { Router } from "express";
import userController from "../controller/userController";

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
            this.userController.getUsers
        );
        this.router.post(
            `${this.path}/create`,
            this.userController.createUsers
        );
    }
}
export default userRoute