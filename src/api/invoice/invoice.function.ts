import { Sequelize } from "sequelize";
import Invoice from "./invoice.model";

export const groupInvoicesByDate = async (groupingType: string) => {
	try {
		let dateFormat: string;

		switch (groupingType) {
			case "day":
				dateFormat = "%Y-%m-%d"; // Group by day
				break;
			case "month":
				dateFormat = "%Y-%m"; // Group by month
				break;
			case "year":
				dateFormat = "%Y"; // Group by year
				break;
			default:
				throw new Error(
					'Invalid grouping type. Use "day", "month", or "year".'
				);
		}

		const invoicesGroupedByDate = await Invoice.findAll({
			attributes: [
				[
					Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), dateFormat),
					"date",
				],
				[Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
			],
			group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), dateFormat)],
			order: [
				[Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), dateFormat), "ASC"],
			],
		});

		return invoicesGroupedByDate.map((invoice) => ({
			date: invoice.getDataValue("date"),
			count: invoice.getDataValue("count"),
		}));
	} catch (error) {
		console.error("Error grouping invoices by date:", error);
	}
};
