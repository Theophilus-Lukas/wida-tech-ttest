import { Request,Response } from "express";
import { StatusCodes as status } from "http-status-codes";
import asyncHandler from "express-async-handler";

import { User } from "../models/user";

class userController {
    public getUsers = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const users = await User.findAll()
        res.status(status.OK).json(users)
    });

    public createUsers = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const {firstName, lastName} = req.body;

        const user = await User.create({
            firstName,
            lastName
        })
        res.status(status.OK).json(user)
    })
}

export default userController
