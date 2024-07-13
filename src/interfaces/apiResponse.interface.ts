import { PaginationInterface } from "./pagination.interface";

export interface ApiResponseInterface {
	code: number;
	status: string;
	message: string;
	data?: unknown;
	meta?: PaginationInterface;
	errors?: string | object;
}
