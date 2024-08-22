import { successResponse, errorResponse } from '../utils/common-utils';

const usersService = {
	helloUser: async () => {
		return successResponse({ message: 'Hello Users!!' }, 'Successful Response', 200);
	},
};

export default usersService;
