import { Router } from "express";
import invoiceController from "./invoice.controller";

class invoiceRoute {
	public path = "/invoice";
	public router = Router();
	public invoiceController = new invoiceController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			`${this.path}/`,
			//middleware
			this.invoiceController.getInvoices
		);
		this.router.post(
			`${this.path}/create`,
			// middleware,
			this.invoiceController.createInvoice
		);
		this.router.get(
			`${this.path}/analytics`,
			// middleware,
			this.invoiceController.getInvoicesAnalytics
		);
	}
}
export default invoiceRoute;
