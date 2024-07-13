import ProductSold from "@api/product_sold/products_sold.model";
import db from "@config/database";
import { DataTypes, Model } from "sequelize";

class Invoice extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id: string;
	public invoice_no: number;
	public date: Date;
	public customer: string;
	public sales_person: string;
	public payment_type: string;
	public notes: string;

	public readonly product_sold?: ProductSold[];
	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly deleted_at: Date | null;
}

Invoice.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true,
		},
		invoice_no: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		customer: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sales_person: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		payment_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: db.sequelize,
		tableName: "invoice",
		timestamps: true,
		underscored: true,
		paranoid: true,
	}
);

Invoice.hasMany(ProductSold, {
	sourceKey: "invoice_no",
	foreignKey: "invoice_no",
	as: "product_sold",
});

export default Invoice;
