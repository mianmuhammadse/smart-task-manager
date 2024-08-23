import { successResponse, errorResponse, ErrorResponse, SuccessResponse } from '../utils/common-utils';
import {
	sendEmailVerification,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	getAuth,
} from '../firebase';
import { User } from '../db/models/user';
import log from '../utils/log';
import { Response } from 'express';

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

		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return errorResponse('Email already in use', 400, {
				email: 'Email already in use',
			});
		}

		const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
		const { user } = userCredentials;

		const newUser = await User.create({
			email: user.email,
			firebaseId: user.uid,
			photoURL: user.providerData[0].photoURL,
			displayName: user.providerData[0].displayName,
		});

		await sendEmailVerification(userCredentials.user);

		return successResponse(newUser, 'User created successfully and verification email sent!', 200);
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
			const existingUser = await User.findOne({ where: { email } });

			if (!existingUser) {
				return errorResponse('Invalid credentials', 422, {
					email: 'Invalid credentials',
				});
			}
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await userCredentials.user.getIdToken();
			const userToReturn = {
				email: userCredentials.user.email,
				displayName: userCredentials.user.displayName,
				photoURL: userCredentials.user.photoURL,
			};
			const data = { idToken, user: userToReturn };

			return successResponse(data, 'User logged in successfully', 200);
		} catch (error: any) {
			const errors: any = {};
			if (error.code === 'auth/invalid-credential') {
				errors.email = 'Invalid email or password';
			}
			return errorResponse('Invalid credentials', 422, errors);
		}
	},

	logOutUser: async () => {
		await signOut(auth);
		return successResponse({}, 'User logged out successfully', 200);
	},
};

export default authService;
