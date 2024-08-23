import { successResponse, errorResponse, ErrorResponse, SuccessResponse } from '../utils/common-utils';
import {
	sendEmailVerification,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
} from '../firebase';

const auth = getAuth();

const authService = {
	register: async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<ErrorResponse | SuccessResponse> => {
		if (!email || !password) {
			const errors = {
				email: 'Email is required',
				password: 'Password is required',
			};
			return errorResponse('Validation failed', 422, errors);
		}

		try {
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			await sendEmailVerification(userCredentials.user);
			return successResponse(userCredentials, 'User created successfully and verification email sent!', 200);
		} catch (error: any) {
			return errorResponse('Email already in use', 400, {
				email: 'Email already in use',
			});
		}
	},
	loginUser: async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<ErrorResponse | SuccessResponse> => {
		if (!email || !password) {
			const errors = {
				email: 'Email is required',
				password: 'Password is required',
			};
			return errorResponse('Validation failed', 422, errors);
		}

		try {
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			console.log(userCredentials);

			return successResponse(userCredentials, 'User logged in successfully', 200);
		} catch (error: any) {
			const errors: any = {};
			if (error.code === 'auth/invalid-credential') {
				errors.email = 'Invalid email or password';
			}
			return errorResponse('Invalid credentials', 422, errors);
		}
	},
};

export default authService;
