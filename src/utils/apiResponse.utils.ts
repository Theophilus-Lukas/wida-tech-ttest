import { ApiResponseInterface } from "@interfaces/apiResponse.interface";
import { PaginationInterface } from "@interfaces/pagination.interface";

/**
 * Returns a custom response.
 */
export function apiResponse(
	code: number,
	responseStatus: string,
	message: string,
	data?: unknown,
	meta?: PaginationInterface
): ApiResponseInterface {
	return {
		code,
		status: responseStatus,
		message,
		data: data || {},
		meta,
	};
}
