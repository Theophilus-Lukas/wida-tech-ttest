import User from "./user.model";
import { ApiResponseInterface } from "@interfaces/apiResponse.interface";
import { apiResponse } from "@utils/apiResponse.utils";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default class UserService {
	public login = async (
		email: string,
		password: string
	): Promise<ApiResponseInterface> => {
		const user = await User.findOne({
			where: {
				email: email,
			},
		});
		if (!user) {
			return apiResponse(
				401,
				"INVALID_CREDENTIALS",
				"credentials entered is invalid"
			);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return apiResponse(
				401,
				"INVALID_CREDENTIALS",
				"credentials entered is invalid"
			);
		}

		const result = {
			email: email,
			user_id: user.id,
			token: jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY),
		};

		return apiResponse(200, "OK", "Login successful", result);
	};

	public createUser = async (
		first_name: string,
		last_name: string,
		email: string,
		password: string
	): Promise<ApiResponseInterface> => {
		const hashedPass = await bcrypt.hash(password, 10);

		const user = await User.create({
			first_name: first_name,
			last_name: last_name,
			password: hashedPass,
			email: email,
		});

		const result = {
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
		};

		return apiResponse(200, "OK", "Successfully created USER", result);
	};

	public getUsers = async (): Promise<ApiResponseInterface> => {
		const users = await User.findAll();
		const result = users;

		return apiResponse(200, "OK", "Successfully retrieved all USER", result);
	};
}
