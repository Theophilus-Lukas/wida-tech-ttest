import Invoice from "@api/invoice/invoice.model";
import db from "@config/database";
import { DataTypes, Model } from "sequelize";

class ProductSold extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id: string;
	public invoice_no: number;
	public item: string;
	public quantity: number;
	public total_cogs: number;
	public total_price: number;

	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly deleted_at: Date | null;
}

ProductSold.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true,
		},
		invoice_no: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Invoice,
				key: "invoice_no",
			},
		},
		item: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		total_cogs: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		total_price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize: db.sequelize,
		tableName: "product_sold",
		timestamps: true,
		underscored: true,
		paranoid: true,
	}
);

ProductSold.belongsTo(Invoice, {
	foreignKey: "invoice_no",
	as: "invoice",
});

Invoice.hasMany(ProductSold, {
	sourceKey: "invoice_no",
	foreignKey: "invoice_no",
	as: "product_sold",
});

export default ProductSold;
