import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import InvoiceService from "./invoice.service";

class invoiceController {
	private InvoiceService = new InvoiceService();

	public getInvoices = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const query = req.query as object as { limit?: string; page?: string };
			const getInvoicesResponse = await this.InvoiceService.getInvoices(query);

			res.status(getInvoicesResponse.code).json(getInvoicesResponse);
		}
	);

	public createInvoice = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const { invoice_no, date, customer, sales_person, payment_type, notes } =
				req.body;

			const createInvoiceResponse = await this.InvoiceService.createInvoice(
				invoice_no,
				date,
				customer,
				sales_person,
				payment_type,
				notes
			);

			res.status(createInvoiceResponse.code).json(createInvoiceResponse);
		}
	);
}

export default invoiceController;
