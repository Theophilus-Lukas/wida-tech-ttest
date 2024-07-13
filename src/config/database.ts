import { NODE_ENV } from "@utils/constants.utils";
import { Sequelize } from "sequelize";
import config from "./config";

const dbConfig = config[NODE_ENV] || config["development"];
const sequelize = new Sequelize(
	dbConfig.database as string,
	dbConfig.username as string,
	dbConfig.password,
	dbConfig
);

{
	NODE_ENV !== "test"
		? sequelize
				.authenticate()
				.then(() => {
					console.log("Database Connected, ENV:", NODE_ENV);
				})
				.catch((err) => {
					console.log("Database connection failed", err);
				})
		: null;
}

const db = {
	sequelize,
	Sequelize,
};

export default db;
