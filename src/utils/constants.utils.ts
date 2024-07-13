import { config } from "dotenv";

config();

export const {
	DB_NAME,
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_URL,
	DB_DIALECT,

	PORT,
	JWT_SECRET_KEY,
	JWT_SECRET_KEY_REFRESH,

	NODE_ENV,
} = process.env;
