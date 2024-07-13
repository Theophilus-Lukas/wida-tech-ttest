import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import ProductSoldService from "./product_sold.service";

class productSoldController {
	private productSoldService = new ProductSoldService();

	public getProductsSold = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const getProductSoldResponse =
				await this.productSoldService.getProductsSold();
			res.status(getProductSoldResponse.code).json(getProductSoldResponse);
		}
	);

	public createProductsSold = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const productsSoldList: {
				invoice_no: number;
				item: string;
				quantity: number;
				total_cogs: number;
				total_price: number;
			}[] = req.body;

			const createProductsSoldResponse =
				await this.productSoldService.createProductSold(productsSoldList);

			res
				.status(createProductsSoldResponse.code)
				.json(createProductsSoldResponse);
		}
	);
}

export default productSoldController;
