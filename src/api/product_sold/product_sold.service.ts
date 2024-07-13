import ProductSold from "./products_sold.model";
import { ApiResponseInterface } from "@interfaces/apiResponse.interface";
import { apiResponse } from "@utils/apiResponse.utils";

export default class ProductSoldService {
	public createProductSold = async (
		productSoldList: {
			invoice_no: number;
			item: string;
			quantity: number;
			total_cogs: number;
			total_price: number;
		}[]
	): Promise<ApiResponseInterface> => {
		let productSoldCreated: ProductSold[] = [];

		for (let i = 0; i < productSoldList.length; i++) {
			productSoldCreated.push(
				await ProductSold.create({
					invoice_no: productSoldList[i].invoice_no,
					item: productSoldList[i].item,
					quantity: productSoldList[i].quantity,
					total_cogs: productSoldList[i].total_cogs,
					total_price: productSoldList[i].total_price,
				})
			);
		}

		const result = productSoldCreated;

		return apiResponse(200, "OK", "Successfully created products sold", result);
	};

	public getProductsSold = async (): Promise<ApiResponseInterface> => {
		const productsSold = await ProductSold.findAll();
		const result = productsSold;

		return apiResponse(
			200,
			"OK",
			"Successfully retrieved all products sold",
			result
		);
	};
}
