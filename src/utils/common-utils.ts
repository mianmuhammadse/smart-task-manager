export type ErrorResponse = {
	success: false;
	message: string;
	statusCode: number;
	errors?: any;
};

export type SuccessResponse = {
	success: true;
	data: any;
	message: string;
	statusCode: number;
	meta?: {
		page?: number;
		limit?: number;
		total?: number;
		totalPages?: number;
	};
};

export const errorResponse = (message: string, statusCode: number, errors: any) => {
	const response: ErrorResponse = {
		success: false,
		message,
		statusCode
	};

	if (statusCode) {
		if (statusCode >= 400 && statusCode < 500) {
			response.statusCode = statusCode;
		}
	}

	if (errors) response.errors = errors;

	return response;
};

export const successResponse = (data: any, message: string, statusCode: number, meta?: any) => {
	const response: SuccessResponse = {
		success: true,
		data: data,
		message,
		statusCode,
	};

	if (meta) {
		// ** Add meta to response **
		// page, limit, total, totalPages
		response.meta = meta;
	}

	return response;
};
