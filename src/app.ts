import { Request, Response } from "express";
import cors = require("cors");
import express = require("express");

import { Routes } from "@interfaces/routes.interface";
import db from "@config/database";
import { StatusCodes as status } from "http-status-codes";
import { PORT, NODE_ENV } from "@utils/constants.utils";
import errorMiddleware from "@middlewares/error.middleware";

import { apiResponse } from "@utils/apiResponse.utils";

class App {
	public app: express.Application;
	public port: number | string;
	public env: string;

	constructor(routes: Routes[]) {
		this.app = express();
		this.app.disable("x-powered-by");
		this.app.set("trust proxy", true);

		this.port = PORT || 3000;
		this.env = NODE_ENV || "development";

		this.connectToDB();

		this.initializeMiddlewares();

		this.initializeRoutes("/api", routes);

		this.initializeErrorHandling();

		this.initializeNotFound();
	}

	public listen(): void {
		const server = this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});

		server.keepAliveTimeout = 15000; // 15 Seconds
	}

	private connectToDB(): void {
		db.sequelize.sync({ force: false, alter: true });
	}

	private initializeRoutes(
		basePath: string,
		routes?: Routes[] | undefined
	): void {
		routes?.forEach((route) => {
			this.app.use(basePath, route.router);
		});
	}

	private initializeMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(
			cors({
				origin: "*",
				credentials: true,
				exposedHeaders: ["x-activity-hash"],
			})
		);
	}

	private initializeErrorHandling(): void {
		this.app.use(errorMiddleware);
	}

	private initializeNotFound(): void {
		this.app.use((req: Request, res: Response, next: express.NextFunction) => {
			res.set("Cache-Control", "no-store");
			next();
		});

		this.app.use((req: Request, res: Response) =>
			res
				.status(status.NOT_FOUND)
				.json(
					apiResponse(
						status.NOT_FOUND,
						"NOT_FOUND",
						"The requested resource could not be found"
					)
				)
		);
	}
}

export default App;
