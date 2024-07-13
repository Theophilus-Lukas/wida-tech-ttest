import db from "@config/database";
import { DataTypes, Model } from "sequelize";

class User extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id: string;
	public first_name: string;
	public last_name: string;
	public email: string;
	public password: string;

	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly deleted_at: Date | null;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: db.sequelize,
		tableName: "user",
		timestamps: true,
		underscored: true,
		paranoid: true,
	}
);

export default User;
