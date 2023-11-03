import { Request,Response } from "express";
import { StatusCodes as status } from "http-status-codes";
import asyncHandler from "express-async-handler";

import { User } from "../models/user";
import dotenv from "dotenv";
dotenv.config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class userController {
    public getUsers = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const users = await User.findAll()
        res.status(status.OK).json(users)
    });

    public createUsers = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const {firstName, lastName, email, password} = req.body;
        
        const hashedPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            password: hashedPass,
            email:email,
        })
        res.status(status.OK).json(user)
    })

    public login = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const {email, password} = req.body;
        
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {res.status(status.NOT_FOUND).json({message: "USER_NOT_FOUND"})}

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(status.UNAUTHORIZED).json({message: "INCORRECT_EMAIL_OR_PASSWORD"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY)
        res.status(status.OK).json({email: email, user_id: user.id, token: token})
    });

    public bigRequest = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const {search_id} = req.body;
        const start = new Date().getTime();
        const users = await User.findAll({
            order: [['id', 'ASC']],
        })
        let result
        // for (let i = 0; i< users.length; i+=1) {
        //     await sleep(1000)
        //     if (users[i].id == search_id) {
        //         result = users[i]
        //         break
        //     }
        //     console.log("elapsed ", new Date().getTime() - start)
        // }

        let left = 0;
        let right = users.length -1;
        while(left <= right) {
            await sleep(1000)
            const mid = Math.floor((right+left)/2);
            if (users[mid].id === search_id){
                result = users[mid];
                break;
            } else if (users[mid].id < search_id) {
                left = mid+1
            } else {
                right = mid-1
            }
            console.log("elapsed ", new Date().getTime() - start)
        }
        
        const end = new Date().getTime();
        res.status(status.OK).json({result: result, exttime: end-start})
    });
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default userController
