import { Router } from "express";
import productSoldController from "./product_sold.controller";

class productSoldRoute {
	public path = "/product-sold";
	public router = Router();
	public productSoldController = new productSoldController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			`${this.path}/`,
			//middleware
			this.productSoldController.getProductsSold
		);
		this.router.post(
			`${this.path}/create`,
			// middleware,
			this.productSoldController.createProductsSold
		);
	}
}
export default productSoldRoute;
