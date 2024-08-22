type ErrorResponse = {
	success: false;
	message: string;
	statusCode?: number;
	errors?: any;
};

type SuccessResponse = {
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

export const errorResponse = (message = 'An error occurred', statusCode = null, errors = null) => {
	const response: ErrorResponse = {
		success: false,
		message,
	};

	if (statusCode) {
		if (statusCode >= 400 && statusCode < 500) {
			if (statusCode === 400) {
				response.statusCode = statusCode;
			} else if (statusCode === 409) {
				response.statusCode = statusCode;
			} else if (statusCode === 404) {
				response.statusCode = statusCode;
			}
		}
	}

	if (errors) response.errors = errors;

	return response;
};

export const successResponse = (data, message = 'Request was successful', statusCode = 200, meta = null) => {
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
