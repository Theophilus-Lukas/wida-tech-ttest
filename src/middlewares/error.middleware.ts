import { NextFunction, Request, Response } from "express";
import { apiResponse } from "@/utils/apiResponse.utils";
import { ErrorInterface } from "@/interfaces/error.interface";
import { StatusCodes } from "http-status-codes";

// import { logger } from "@utils/logger";

// import { execSync } from "child_process";

const errorMiddleware = async (
	error: ErrorInterface,
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
	try {
		// if error is SequelizeUniqueConstraintError then it will have parent property
		console.log("error.parent: ", error.parent);
		console.log("error.parent.code: ", error.parent?.code);
		console.log("error: ", error);

		const errorLog =
			typeof error.message == "string"
				? error.message
				: JSON.stringify(error.message);

		// logger.error(
		//   `[${req.method}] ${req.path} >> StatusCode:: ${error.code}, Message:: ${errorLog}`,
		// );

		if (errorLog === "query timed out") {
			// execSync(
			//   "screen -X -S testing quit && screen -mdS testing && screen -r testing -X stuff 'cd /home/m-knows/be-lms-dev && npm run local\n'",
			// );
			// process.exit(1);
		}

		// Sequelize error handler
		if (error?.parent?.code) {
			switch (error.parent.code) {
				case "42883":
				case "42601":
				case "42P01":
				case "22P02":
				case "23503":
				case "42703": {
					if (error.message.startsWith("invalid input syntax for type uuid")) {
						return res
							.status(400)
							.json(
								apiResponse(
									StatusCodes.BAD_REQUEST,
									"BAD_REQUEST",
									"Invalid UUID Format"
								)
							);
					} else {
						return res
							.status(400)
							.json(
								apiResponse(
									StatusCodes.BAD_REQUEST,
									"BAD_REQUEST",
									"Invalid type of data"
								)
							);
					}
				}
				case "22001": {
					const message = "String is too long";
					return res
						.status(400)
						.json(apiResponse(StatusCodes.BAD_REQUEST, "BAD_REQUEST", message));
				}
				case "23505": {
					if (error.parent && error.parent.detail) {
						// Regex untuk menangkap nilai dari 'name' yang menyebabkan duplikasi
						const regex = /Key \(([^)]+)\) already exists\./;
						const match = error.parent.detail.match(regex);

						if (match && match[1]) {
							const fields = match[1]
								.split(", ")
								.map((field) => field.split("=")[0].trim());
							const customMessage = fields
								.map((field) => `${field} telah digunakan`)
								.join(", ");
							return res
								.status(400)
								.json(
									apiResponse(
										StatusCodes.BAD_REQUEST,
										"BAD_REQUEST",
										customMessage,
										{}
									)
								);
						} else {
							return res
								.status(400)
								.json(
									apiResponse(
										StatusCodes.BAD_REQUEST,
										"BAD_REQUEST",
										"Sepertinya ada duplikasi data. Silahkan cek kembali",
										{}
									)
								);
						}
					}

					const message = error.parent.detail;
					return res
						.status(409)
						.json(apiResponse(StatusCodes.CONFLICT, "CONFLICT", message));
				}
			}
		}

		if (error?.["type"] === "entity.parse.failed") {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid JSON",
						{}
					)
				);
		}

		// jwt error handler
		if (error.name) {
			switch (error.name) {
				case "JsonWebTokenError": {
					const message = "Invalid or Expired token. Please login again";
					return res
						.status(StatusCodes.UNAUTHORIZED)
						.json(
							apiResponse(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED", message)
						);
				}
				case "TokenExpiredError": {
					const message = "Invalid or Expired Token. Please login again";
					return res
						.status(StatusCodes.UNAUTHORIZED)
						.json(
							apiResponse(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED", message)
						);
				}
			}
		}

		const code = error.code || 500;
		const status = error.status || "INTERNAL_SERVER_ERROR";
		const message =
			typeof error.message == "string" ? error.message : "" || "WE_DONT_KNOW";

		if (message === "Unexpected field") {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Field Name",
						{}
					)
				);
		}

		if (message.includes("Cannot access")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Functionality #991",
						{}
					)
				);
		}

		if (message.includes("You've included an alias")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Sepertinya ada kesalahan dalam sistem. Silahkan coba lagi nanti",
						{}
					)
				);
		}

		if (message.includes("Cannot read properties of null")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Functionality #121",
						{}
					)
				);
		}

		if (message.endsWith("is not a function")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Code Functionality #115",
						{}
					)
				);
		}

		if (message.endsWith("cannot be null")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Sepertinya ada kesalahan pada inputan. Silahkan cek kembali",
						{}
					)
				);
		}

		if (message === "Field name missing") {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Field Name",
						{}
					)
				);
		}

		if (message.startsWith("Cannot read properties"))
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Format #102",
						{}
					)
				);

		if (message.startsWith("WHERE parameter"))
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid Input #107",
						{}
					)
				);

		if (message.startsWith("Unexpected token")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Invalid JSON",
						{}
					)
				);
		}

		if (code === 500) {
			return res.status(code).json(apiResponse(code, status, message));
		}

		if (message === "Too many files") {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"There are files that not valid",
						{}
					)
				);
		}

		if (message.endsWith("is not defined")) {
			return res
				.status(400)
				.json(
					apiResponse(
						StatusCodes.BAD_REQUEST,
						"BAD_REQUEST",
						"Sepertinya ada kesalahan. Silahkan coba lagi",
						{}
					)
				);
		}

		return res.status(code).json(apiResponse(code, status, message));
	} catch (err) {
		next(err);
	}
};

export default errorMiddleware;
