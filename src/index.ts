import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import Database from "./config/database";

dotenv.config();

const app: Application = express();

const db = new Database;
db.sequelize?.sync();

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server hidup pada http://localhost:${port}`)
})

