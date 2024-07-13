require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

module.exports = {
	development: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: DB_PORT,
		dialect: "postgres",
		define: {
			paranoid: true,
			timestamps: true,
			underscored: true,
			underscoredAll: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
		},
		defaultScope: {
			attributes: {
				exclude: ["created_at", "updated_at", "deleted_at"],
			},
		},
		logging: false,
	},
};
