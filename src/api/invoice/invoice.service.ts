import ProductSold from "@api/product_sold/products_sold.model";
import Invoice from "./invoice.model";
import { ApiResponseInterface } from "@interfaces/apiResponse.interface";
import { apiResponse } from "@utils/apiResponse.utils";
import { metaPaginationBuilder } from "@utils/pagination.utils";

export default class InvoiceService {
	public createInvoice = async (
		invoice_no: number,
		date: Date,
		customer: string,
		sales_person: string,
		payment_type: string,
		notes?: string
	): Promise<ApiResponseInterface> => {
		const invoice = await Invoice.create({
			invoice_no: invoice_no,
			date: date,
			customer: customer,
			sales_person: sales_person,
			payment_type: payment_type,
			notes: notes,
		});

		const result = invoice;

		return apiResponse(200, "OK", "Successfully created invoice", result);
	};

	public getInvoices = async (query: {
		limit?: string;
		page?: string;
	}): Promise<ApiResponseInterface> => {
		const page = Number(query?.page) || 1;
		const limit = Number(query?.limit) || 10;
		const offset = (page - 1) * limit;

		const invoices = await Invoice.findAndCountAll({
			offset: offset,
			limit: limit,
			include: [
				{
					model: ProductSold,
					as: "product_sold",
					attributes: ["item", "quantity", "total_cogs", "total_price"],
				},
			],
		});
		const result = invoices.rows.map((invoice) => {
			let total_paid = 0;
			for (let j = 0; j < (invoice.product_sold?.length || 0); j++) {
				if (
					invoice &&
					invoice.product_sold &&
					typeof invoice.product_sold[j] !== "undefined"
				) {
					total_paid += invoice.product_sold[j].total_price;
				}
			}
			return {
				invoice_no: invoice.invoice_no,
				date: invoice.date,
				customer: invoice.customer,
				sales_person: invoice.sales_person,
				payment_type: invoice.payment_type,
				notes: invoice.notes,
			};
		});

		const paginationInfo = metaPaginationBuilder(offset, limit, invoices.count);

		return apiResponse(
			200,
			"OK",
			"Successfully retrieved all invoices",
			result,
			paginationInfo
		);
	};
}
