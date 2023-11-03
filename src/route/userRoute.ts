import { Router } from "express";
import userController from "../controller/userController";
import { authenticate } from "../middlewares/authentication";

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
        this.router.get(
            `${this.path}/testperformance`,
            // middleware,
            this.userController.bigRequest
        );
    }
}
export default userRoute