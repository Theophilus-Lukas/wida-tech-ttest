import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import Database from "./config/database";
import userRoute from "./route/userRoute";

const cors = require('cors');

dotenv.config();

const app: Application = express();
app.use(express.json())

const db = new Database;
db.sequelize?.sync();

app.use(
    cors({
        origin: [
            "http://127.0.0.1:8000",
        ]
    })
)

const port = process.env.PORT || 8000;

const user_route: any = new userRoute
app.use(
    "/api/",
    user_route.router
);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server hidup pada http://localhost:${port}`)
})

